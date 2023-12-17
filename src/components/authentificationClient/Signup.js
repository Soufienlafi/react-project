import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const auth = getAuth();

    const sub = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pwd)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("Email Sent");
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err);
                    });

                navigate('/client', {
                    state: { email, password: pwd }
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
            });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: "solid 2px gray",
                    padding: 4,
                    width: "100%",
                    borderRadius: 8,
                    boxShadow: 2,
                }}
            >
                <PersonAddIcon fontSize="large" color="primary" /> 
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={sub} noValidate sx={{ mt: 2 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="pwd"
                        label="Password"
                        type="password"
                        id="pwd"
                        autoComplete="current-password"
                        onChange={({ target }) => setPwd(target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        color="primary"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Typography sx={{ mt: 2 }}>
                        Already have an account? <Link to="/loginClient">Log In</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
