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
import axios from '../configs/axios';
import { useSnackbar } from '../contexts/SnackbarContext';
import { useFriendRequests } from '../hooks/useFriendRequests';

export const FriendRequests = () => {
  const snackbar = useSnackbar();
  const [requests, pendingRequests] = useFriendRequests();

  const onAcceptRequest = (requester) => {
    axios
      .post('/users/requests/accept', { from: requester._id })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          snackbar.show(`${requester.username} is now your friend!`);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const onDeclineRequest = (requster) => {};

  return (
    <Paper elevation={1} sx={{ margin: '1rem' }}>
      <Typography variant="h6" gutterBottom sx={{ padding: '1rem 0 0 1rem' }}>
        Friend Requests
      </Typography>
      <Divider sx={{ margin: '.5rem 0' }} />
      {requests.length ? (
        <List>
          {requests.map(({ from }) => (
            <ListItem
              key={from._id}
              secondaryAction={
                <Button
                  color="success"
                  variant="outlined"
                  onClick={() => {
                    onAcceptRequest(from);
                  }}
                >
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
                  onClick={() => {
                    onDeclineRequest(from);
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
              <ListItemAvatar>
                <Avatar src={from.iconUrl || '/images/man.png'} />
              </ListItemAvatar>
              <ListItemText primary={from.username} />
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
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginTop: '1rem', padding: '1rem 0 0 1rem' }}
          >
            Pending Requests
          </Typography>

          <Divider sx={{ margin: '.5rem 0' }} />
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
