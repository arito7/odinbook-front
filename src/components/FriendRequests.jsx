import { Delete } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  Tooltip,
} from '@mui/material';
import React from 'react';
import axios from '../configs/axios';
import { useSnackbar } from '../contexts/SnackbarContext';
import { useData } from '../contexts/DataContext';

export const FriendRequests = () => {
  const snackbar = useSnackbar();
  const data = useData();

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
      {data.requests.length ? (
        <List>
          {data.requests.map(({ from }) => (
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

      {data.pendingRequests.length ? (
        <>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginTop: '1rem', padding: '1rem 0 0 1rem' }}
          >
            Pending Requests
          </Typography>

          <Divider sx={{ margin: '.5rem 0' }} />
          <List sx={{ display: 'grid' }}>
            {data.pendingRequests.map((request) => (
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
