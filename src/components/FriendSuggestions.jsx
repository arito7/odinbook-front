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
import React from 'react';
import axios from '../configs/axios';
import usePeople from '../hooks/usePeople';

const FriendSuggestions = () => {
  const people = usePeople();
  const onFriendAdd = (person) => {
    axios
      .post('/users/request', { to: person._id })
      .then((res) => {
        console.log(res.data);
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
