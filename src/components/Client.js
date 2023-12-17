import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Input,
} from '@mui/material';

function Client() {
  const navigate = useNavigate();
  const location = useLocation();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState(location?.state?.email || '');
  const [password, setPassword] = useState(location?.state?.password || '');
  const [tel, setTel] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('images/avatar.jpeg');

  useEffect(() => {
    setEmail(location?.state?.email || '');
    setPassword(location?.state?.password || '');
  }, [location?.state?.email, location?.state?.password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      nom,
      prenom,
      adresse,
      email,
      password,
      tel,
      avatarUrl,
    };
    if (!nom || !prenom || !adresse || !email || !password || !tel) {
      alert('Please fill in all the fields');
      return;
    }

    axios
      .post('http://localhost:3001/client', newClient)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        alert('Erreur ! Insertion non effectuée');
      });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url('your-background-image.jpg')`,
        backgroundSize: 'cover',
      }}
    >
      <Card sx={{ p: 4, width: 400, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography variant="h5" align="center" mb={4}>
          New Client
        </Typography>
         <form onSubmit={handleSubmit}>
          <TextField
            label="Nom"
            variant="outlined"
            fullWidth
            mb={2}
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <TextField
            label="Prenom"
            variant="outlined"
            fullWidth
            mb={2}
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <TextField
            label="Adresse"
            variant="outlined"
            fullWidth
            mb={2}
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            mb={2}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            mb={2}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Tel"
            variant="outlined"
            fullWidth
            mb={3}
            type="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <Input
              accept="image/*"
              type="file"
              id="avatar-input"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setAvatarUrl(selectedFile ? 'images/' + selectedFile.name : 'images/avatar.jpeg');
              }}
              mb={3}
            />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Valider
          </Button>
        </form>
      </Card>
    </Container>
  );
}

export default Client;
