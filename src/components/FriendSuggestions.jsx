import { PersonAddAltRounded } from '@mui/icons-material';
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
import React, { useState } from 'react';
import axios from '../configs/axios';
import { useData } from '../contexts/DataContext';
import { useSnackbar } from '../contexts/SnackbarContext';

const FriendSuggestions = () => {
  const [disableAddButton, setDisableAddButton] = useState(false);
  const snackbar = useSnackbar();
  const data = useData();

  const onFriendAdd = (person) => {
    setDisableAddButton(true);
    axios
      .post('/users/requests', { to: person._id })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          snackbar.show('Friend request sent!');
          data.updatePeople();
          data.updateRequests();
          setDisableAddButton(false);
        } else {
          if (res.data.message === 'There is a preexisting request') {
            snackbar.show('You already have a pending request!', 'error');
            setDisableAddButton(false);
          }
        }
      })
      .catch((err) => {
        snackbar.show(err.message, 'error');
      });
  };

  return (
    <Paper elevation={1} sx={{ margin: '1rem' }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ padding: '1rem', paddingBottom: 0 }}
      >
        Checkout these people!
      </Typography>
      <Divider />
      <List sx={{ display: 'grid' }}>
        {data.people.map((person) => (
          <ListItem
            key={person._id}
            secondaryAction={
              <IconButton
                color="secondary"
                disabled={disableAddButton}
                onClick={() => {
                  onFriendAdd(person);
                }}
              >
                <PersonAddAltRounded />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar src={person.iconUrl} />
            </ListItemAvatar>
            <ListItemText primary={person.username} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FriendSuggestions;
