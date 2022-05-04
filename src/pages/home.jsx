import {
  EmojiEmotionsRounded,
  Image as ImageIcon,
  Send,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Post } from '../components/Post';
import * as Yup from 'yup';

const Home = () => {
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string()
        .min(3, 'Post is too short.')
        .max(500, 'Post is too long')
        .required('You have to say something!'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const posts = [
    {
      username: 'Test Jones',
      message: 'This is a test message',
      date: '12/12/12',
    },
    {
      username: 'Mike Testi',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      date: '12/12/12',
    },
    {
      username: 'Test Jones',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis.',
      date: '12/12/12',
    },
  ];

  return (
    <Box sx={{ display: 'grid', p: '1rem', gap: '1rem' }}>
      <Paper sx={{ p: '1rem', borderRadius: '.5rem' }} elevation={1}>
        <Typography gutterBottom>What's on your mind?</Typography>
        <TextField
          variant="standard"
          id="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          placeholder="Something nice..."
          multiline
          error={formik.errors.body}
          helperText={formik.errors.body}
          fullWidth
          maxRows={10}
        />
        <Box
          sx={{
            marginBottom: '-.5rem',
            marginTop: '.5rem',
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
          }}
        >
          <IconButton>
            <ImageIcon />
          </IconButton>
          <IconButton>
            <EmojiEmotionsRounded />
          </IconButton>
          <Button
            onClick={formik.handleSubmit}
            variant="contained"
            sx={{ justifySelf: 'end' }}
          >
            Post <Send sx={{ marginLeft: '.5rem' }} />
          </Button>
        </Box>
      </Paper>

      <Box>
        <Typography variant="h5" sx={{ marginTop: '.5rem' }}>
          Posts
        </Typography>
      </Box>

      {posts.map((p) => (
        <Post post={p} />
      ))}
    </Box>
  );
};

export default Home;
