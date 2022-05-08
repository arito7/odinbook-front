import { Delete } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  ListItemButton,
  Tooltip,
} from '@mui/material';
import React from 'react';
import { useFriendRequests } from '../hooks/useFriendRequests';

export const FriendRequests = () => {
  const [requests, pendingRequests] = useFriendRequests();

  return (
    <Paper elevation={1} sx={{ padding: '1rem', margin: '1rem' }}>
      <Typography variant="h6" gutterBottom>
        Friend Requests
      </Typography>
      <Divider sx={{ margin: '.5rem -1rem' }} />
      {requests.length ? (
        <List>
          {requests.map((req) => (
            <ListItem
              key={req.from._id}
              secondaryAction={
                <Button color="success" variant="outlined">
                  Accept
                </Button>
              }
            >
              <Tooltip title="Decline">
                <IconButton
                  color="error"
                  sx={{
                    marginRight: '.5rem',
                    paddingLeft: 0,
                    marginLeft: '-.5rem',
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
              <ListItemAvatar>
                <Avatar src={req.iconUrl || '/images/man.png'} />
              </ListItemAvatar>
              <ListItemText primary={req.from.username} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ textAlign: 'center', paddingTop: '1rem' }}>
          You don't have any friend requests yet :(
        </Typography>
      )}

      {pendingRequests.length ? (
        <>
          <Typography variant="h6" gutterBottom sx={{ marginTop: '1rem' }}>
            Pending Requests
          </Typography>

          <Divider sx={{ margin: '.5rem -1rem' }} />
          <List>
            {pendingRequests.map((request) => (
              <ListItem key={request.to._id}>
                <ListItemAvatar>
                  <Avatar src={request.to.iconUrl || '/images/man.png'} />
                </ListItemAvatar>
                <ListItemText primary={request.to.username} />
              </ListItem>
            ))}
          </List>
        </>
      ) : null}
    </Paper>
  );
};
