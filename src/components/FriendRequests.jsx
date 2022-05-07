import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * handle no friends
 * handle no requests
 */
export const FriendRequests = () => {
  const auth = useAuth();
  return (
    <Paper elevation={1} sx={{ padding: '1rem', margin: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Friend Requests
      </Typography>
      <Divider sx={{ margin: '.5rem -1rem' }} />
      {auth.user.friendRequests.map((req) => (
        <Box
          key={req._id}
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
  );
};
