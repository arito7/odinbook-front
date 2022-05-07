import { Message, SearchRounded } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import FriendSuggestions from '../components/FriendSuggestions';
import { FriendRequests } from '../components/FriendRequests';
import { FriendsList } from '../components/FriendsList';

const Friends = () => {
  return (
    <Box>
      <Box sx={{ margin: '1rem' }} s>
        <TextField
          fullWidth
          placeholder="Find friends!"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <FriendSuggestions />

      <FriendRequests />

      <FriendsList />
    </Box>
  );
};
export default Friends;
