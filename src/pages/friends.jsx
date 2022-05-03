import { Message, MessageRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

const friendReqSet = [{ username: 'Testi Joness', icon: '/images/man.png' }];
const friendsSet = [{ username: 'Beast Fiend', icon: '/images/man.png' }];
const Friends = () => {
  return (
    <Box>
      <Paper elevation={1} sx={{ padding: '1rem', margin: '1rem' }}>
        <Typography variant="h5" gutterBottom>
          Friend Requests
        </Typography>
        <Divider sx={{ margin: '.5rem -1rem' }} />
        {friendReqSet.map((req) => (
          <Box
            sx={{
              display: 'grid',
              gap: '.5rem',
              gridTemplateColumns: 'auto 1fr',
              alignItems: 'center',
            }}
          >
            <Avatar src={req.icon} />
            <Box>
              <Typography gutterBottom>{req.username}</Typography>
              <Box>
                <Button
                  size="small"
                  sx={{ marginRight: '.5rem' }}
                  variant="contained"
                >
                  Confirm
                </Button>
                <Button size="small" variant="outlined" color="error">
                  Decline
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Paper>
      <Paper elevation={1} sx={{ margin: '1rem' }}>
        <Typography variant="h5" gutterBottom sx={{ padding: '1rem 0 0 1rem' }}>
          Friends
        </Typography>
        <Divider />
        <List>
          {friendsSet.map((friend) => (
            <ListItem
              secondaryAction={
                <IconButton>
                  <MessageRounded />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={friend.icon} />
              </ListItemAvatar>
              <ListItemText primary={friend.username} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

/**
 * handle no friends
 * handle no requests
 */

export default Friends;
