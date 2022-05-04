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

const Navbar = () => {
  const navigate = useNavigate();
  const [drawerVisibile, setDrawerVisible] = useState(false);
  const globalItems = [
    {
      label: 'Home',
      iconElement: <HomeRounded />,
    },
    {
      label: 'Messages',
      iconElement: <MessageRounded />,
    },
    {
      label: 'Friends',
      iconElement: <People />,
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
          <Button color="inherit">Login</Button>
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
                <DrawerItem label={i.label} iconElement={i.iconElement} />
              ))}
            </List>
          </nav>
          <Divider />
          <nav>
            <List sx={{ display: 'grid' }}>
              {accItems.map((i) => (
                <DrawerItem label={i.label} iconElement={i.iconElement} />
              ))}
            </List>
          </nav>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

const DrawerItem = ({ label, iconElement }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>{iconElement}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};
export default Navbar;
