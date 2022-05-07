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
import { friendsSet } from '../pages/friends';

export const FriendsList = () => {
  return (
    <Paper elevation={1} sx={{ margin: '1rem' }}>
      <Typography variant="h5" gutterBottom sx={{ padding: '1rem 0 0 1rem' }}>
        Friends
      </Typography>
      <Divider />
      <List>
        {friendsSet.map((friend) => (
          <ListItem
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
    </Paper>
  );
};
