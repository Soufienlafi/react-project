import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from 'use-shopping-cart';
import jsPDF from 'jspdf';
import { getAuth } from 'firebase/auth';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { cartDetails, clearCart } = useShoppingCart();
  const auth = getAuth();

  const handleDialogClose = () => {
    setOpenDialog(false);
    clearCart();
    navigate('/');
  };

  const handleAlertClose = () => {
    setAlert(null);
  };

  const generateInvoicePDF = async ({ email } = {}) => {
    const pdf = new jsPDF();
    pdf.setFont('helvetica', 'normal');

    pdf.setFontSize(18);
    pdf.text('Tech Shop               Invoice', 20, 15);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);

    pdf.text(`Date: ${formattedDate}`, 160, 15);

    let yPosition = 30;

    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);

    pdf.text('Item', 20, yPosition);
    pdf.text('Price (TND)', 80, yPosition);
    pdf.text('Quantity', 120, yPosition);
    pdf.text('Total (TND)', 160, yPosition);

    yPosition += 10;

    pdf.setDrawColor(200, 200, 200);

    let manualTotal = 0;

    Object.values(cartDetails).forEach((item) => {
      pdf.line(20, yPosition - 3, 190, yPosition - 3);
      yPosition += 7;

      const row = [
        item.title.toString(),
        Number(item.price).toFixed(2).toString(),
        item.quantity.toString(),
        (Number(item.price) * item.quantity).toFixed(2).toString(),
      ];

      pdf.setTextColor(0, 0, 0);
      pdf.text(row[0], 20, yPosition);
      pdf.text(row[1], 80, yPosition);
      pdf.text(row[2], 120, yPosition);
      pdf.text(row[3], 160, yPosition);

      manualTotal += Number(item.price) * item.quantity;

      yPosition += 10;
    });

    pdf.line(20, yPosition - 3, 190, yPosition - 3);
    yPosition += 10;

    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);



    try {
      const userDataResponse = await fetch(`http://localhost:3001/client?email=${email}`);
      const userData = await userDataResponse.json();

      if (userData && userData.length > 0) {
        const { nom, prenom ,adresse , email } = userData[0];
        yPosition += 15;
        if(email == "soufienlefi018@gmail.com")
        {pdf.text(`Total: soufien is the admin !! so he will not pay `, 20, yPosition);}
        else{pdf.text(`Total: ${manualTotal.toFixed(2)} TND`, 20, yPosition);}
        yPosition += 10;
        pdf.text(`Nom: ${nom || ''}`, 20, yPosition);
        yPosition += 10;
        pdf.text(`Prenom: ${prenom || ''}`, 20, yPosition);
        yPosition += 10;
        pdf.text(`Email: ${email || ''}`, 20, yPosition);
        yPosition += 10;
        pdf.text(`adresse: ${adresse || ''}`, 20, yPosition);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }


    pdf.save('invoice.pdf');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!cardNumber || !expiryDate || !cvv) {
      setAlert({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setOpenDialog(true);

    try {
      const currentUser = auth.currentUser;

      generateInvoicePDF({
        nom: currentUser.displayName,
        prenom: '',
        email: currentUser.email,
      });


      setAlert({ type: 'success', message: 'Payment successful! Thank you for shopping at Tech Shop.' });
    } catch (error) {
      console.error('Error fetching user details:', error);
      generateInvoicePDF();

      setAlert({ type: 'error', message: 'Payment failed. Please try again.' });
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Payment Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="cardNumber"
              label="Card Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
            />
            <TextField
              id="expiryDate"
              label="Expiry Date"
              variant="outlined"
              fullWidth
              margin="normal"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
            />
            <TextField
              id="cvv"
              label="CVV"
              variant="outlined"
              fullWidth
              margin="normal"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '16px' }}
            >
              Pay Now
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Thanks for shopping at Tech Shop!</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your payment was successful. We appreciate your business.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert !== null}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleAlertClose} severity={alert?.type} elevation={6} variant="filled">
          {alert?.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default PaymentForm;
