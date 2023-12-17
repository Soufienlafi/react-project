import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../fireConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Menu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email);

        try {
          const response = await axios.get(`http://localhost:3001/Client?email=${user.email}`);
          const client = response.data[0];

          if (client && client.avatarUrl) {
            setAvatarUrl(client.avatarUrl);
          }
        } catch (error) {
          console.error("Error :", error);
        }
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("signOut");
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const sideList = (
    <div style={{ backgroundColor: '#3f51b5', height: '100%', color: 'white' }}>
      <List>
        <ListItem  component={Link} to="/" onClick={toggleDrawer(false)}>
          <ListItemText primary="Home" style={{ color: 'white' }} />
        </ListItem>
        {isLoggedIn && userEmail === "soufienlefi018@gmail.com" && (
          <>
            <ListItem  component={Link} to="/articles" onClick={toggleDrawer(false)}>
              <ListItemText primary="Articles" style={{ color: 'white' }} />
            </ListItem>
            <ListItem  component={Link} to="/AjoutArticle" onClick={toggleDrawer(false)}>
              <ListItemText primary="Add Article" style={{ color: 'white' }} />
            </ListItem>
            <ListItem  component={Link} to="/ListrClient" onClick={toggleDrawer(false)}>
              <ListItemText primary="Client List" style={{ color: 'white' }} />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );


  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Tech Shop
              </Link>
            </Typography>
            {!isLoggedIn ? (
              <Button color="inherit" component={Link} to="/loginclient">
                Log In
              </Button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {avatarUrl && (
                  <Avatar alt="User Avatar" src={avatarUrl} sx={{ width: 40, height: 40, marginRight: 1 }} />
                )}
                <Button color="inherit" onClick={logOut}>
                  Log Out
                </Button>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {isLoggedIn && userEmail === "soufienlefi018@gmail.com" && (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {sideList}
        </Drawer>
      )}
    </>
  );
}

export default Menu;
