import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
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
        <>
          {requests.map((req) => (
            <Box
              key={req._id}
              sx={{
                display: 'grid',
                gap: '.5rem',
                gridTemplateColumns: 'auto 1fr',
                alignItems: 'center',
              }}
            >
              <Avatar src={req.iconUrl || '/images/man.png'} />
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
        </>
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
