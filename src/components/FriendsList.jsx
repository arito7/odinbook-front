import { MessageRounded } from '@mui/icons-material';
import {
  Avatar,
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
import { useAuth } from '../contexts/AuthContext';

export const FriendsList = () => {
  const auth = useAuth();
  return (
    <Paper elevation={1} sx={{ margin: '1rem' }}>
      <Typography variant="h5" gutterBottom sx={{ padding: '1rem 0 0 1rem' }}>
        Friends
      </Typography>
      <Divider />
      {auth.user.friends.length ? (
        <List>
          {auth.user.friends.map((friend) => (
            <ListItem
              key={friend._id}
              secondaryAction={
                <IconButton color="secondary">
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
      ) : (
        <Typography sx={{ textAlign: 'center', padding: '1rem' }}>
          You don't have any friends yet :(
        </Typography>
      )}
    </Paper>
  );
};
