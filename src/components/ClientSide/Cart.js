import React from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Delete from '@mui/icons-material/Delete';
import Remove from '@mui/icons-material/Remove';

const CartItem = ({ item, increment, decrement, remove }) => {
  return (
    <Grid item xs={12} key={item.id}>
      <img
        alt={item.title}
        style={{ margin: '0 auto', maxHeight: '1500px', borderRadius: '8px' }}
        src={item.image}
        className="img-fluid d-block"
      />
      <h5>{item.title}</h5>
      <p>Prix: {item.price} TND</p>
      <p>Qté: {item.quantity}</p>
      <div>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => {
            if (item.quantity < item.qtestock) {
              increment(item.id);
            } else {
              alert('Quantité stock indisponible');
            }
          }}
        >
          <AddShoppingCartIcon />
        </Button>
        {item.quantity > 1 && (
          <Button variant="contained" color="warning" size="small" onClick={() => decrement(item.id)}>
            <Remove />
          </Button>
        )}
        {item.quantity === 1 && (
          <Button variant="contained" color="error" size="small" onClick={() => remove(item.id)}>
            <Delete />
          </Button>
        )}
      </div>
      <hr />
    </Grid>
  );
};

const Cart = () => {
  const { cartDetails, removeItem, clearCart, totalPrice, cartCount, incrementItem, decrementItem } = useShoppingCart();
  const navigate = useNavigate();

  const commander = () => {
    navigate('/payment');
  };

  const more = () => {
    navigate('/');
  };

  const clear = () => {
    clearCart();
  };

  if (cartCount === 0) {
    return (
      <Card style={{ maxWidth: 400, margin: 'auto', marginTop: '50vh', transform: 'translateY(-50%)' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <AddShoppingCartIcon style={{ fontSize: 48, color: '#888' }} />
          <Typography variant="h4" color="textSecondary" gutterBottom>
            Cart Empty
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Your shopping cart is currently empty.
          </Typography>
          <Button variant="contained" color="primary" onClick={more} style={{ marginTop: '16px' }}>
            Add Items
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Grid container spacing={3} marginTop={4} marginLeft={4}>
        <Grid item xs={8}>
          {cartDetails &&
            Object.values(cartDetails).map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increment={incrementItem}
                decrement={decrementItem}
                remove={removeItem}
              />
            ))}
        </Grid>
        <Grid item xs={4}>
          <Button color="primary" variant="outlined" onClick={more}>
            Ajouter des articles
          </Button>
          <p>Total Articles</p>
          <h4>{cartCount}</h4>
          <p>Total Payment</p>
          <h3>{totalPrice} TND</h3>
          <hr />
          <div>
            <Button variant="contained" color="secondary" onClick={commander}>
              Commander
            </Button>
            <Button variant="outlined" color="info" onClick={clear} style={{ marginLeft: '8px' }}>
              Annuler
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
