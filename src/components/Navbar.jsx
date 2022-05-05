import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import {
  HomeRounded,
  MessageRounded,
  People,
  Person,
  Settings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Switch } from '@mui/material';

const Navbar = ({ setMode, mode }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [drawerVisibile, setDrawerVisible] = useState(false);
  const globalItems = [
    {
      label: 'Home',
      iconElement: <HomeRounded />,
      path: '/',
    },
    {
      label: 'Messages',
      iconElement: <MessageRounded />,
    },
    {
      label: 'Friends',
      iconElement: <People />,
      path: '/friends',
    },
  ];
  const accItems = [
    {
      label: 'Account',
      iconElement: <Person />,
    },
    {
      label: 'Settings',
      iconElement: <Settings />,
    },
  ];

  const onLogInOutClick = () => {
    console.log(document.cookie);
    if (auth.user) {
      auth.signout(() => {
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  };

  const onDrawerItemClick = (path) => {
    navigate(path);
    setDrawerVisible(false);
  };

  const handleMenuClick = () => {
    setDrawerVisible(true);
  };

  const onLogoClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={onLogoClick}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            Social App
          </Typography>
          <Button variant="outlined" color="inherit" onClick={onLogInOutClick}>
            {auth.user ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor={'left'}
        open={drawerVisibile}
        onClose={() => setDrawerVisible(false)}
        onOpen={() => console.log('on open')}
      >
        <Box
          sx={{
            width: '85vw',
            maxWidth: 320,
          }}
        >
          <Typography variant="h5" sx={{ padding: '1rem' }}>
            Social App
          </Typography>
          <Divider sx={{ marginBottom: '1rem' }} />
          <nav>
            <List sx={{ display: 'grid' }}>
              {globalItems.map((i) => (
                <DrawerItem
                  label={i.label}
                  iconElement={i.iconElement}
                  onClick={() => onDrawerItemClick(i.path)}
                />
              ))}
            </List>
          </nav>
          <Divider />
          <nav>
            <List sx={{ display: 'grid' }}>
              {accItems.map((i) => (
                <DrawerItem
                  label={i.label}
                  iconElement={i.iconElement}
                  onClick={() => onDrawerItemClick(i.path)}
                />
              ))}
            </List>
          </nav>
          <Divider />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              alignItems: 'center',
              padding: '1rem',
            }}
          >
            <Typography sx={{ marginRight: '1rem' }}>Dark Mode</Typography>
            <Switch
              defaultChecked={mode === 'dark'}
              onChange={(e) =>
                e.target.checked ? setMode('dark') : setMode('light')
              }
            />
          </Box>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

const DrawerItem = ({ label, iconElement, onClick = null }) => {
  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton>
        <ListItemIcon>{iconElement}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};
export default Navbar;
