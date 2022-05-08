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
import { useSnackbar } from '../contexts/SnackbarContext';
import usePeople from '../hooks/usePeople';

const FriendSuggestions = () => {
  const [people, updatePeople] = usePeople();
  const [disableAddButton, setDisableAddButton] = useState(false);
  const snackbar = useSnackbar();

  const onFriendAdd = (person) => {
    setDisableAddButton(true);
    axios
      .post('/users/requests', { to: person._id })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          snackbar.show('Friend request sent!');
          updatePeople();
          setDisableAddButton(false);
        }
      })
      .catch((err) => console.log(err.message));
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
        {people.map((person) => (
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
              <Avatar src={person.iconUri} />
            </ListItemAvatar>
            <ListItemText primary={person.username} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FriendSuggestions;
