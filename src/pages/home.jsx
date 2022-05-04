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
import { useEffect, useState } from 'react';
import { Post } from '../components/Post';
import * as Yup from 'yup';
import axios from '../configs/axios';

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/posts', { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.success) {
            console.log(res.data.posts);
            setPosts(res.data.posts);
          }
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  return posts;
};

const Home = () => {
  const posts = usePosts();

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
      axios
        .post('/posts', { body: values.body }, { withCredentials: true })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.success) {
              formik.handleReset();
            }
          } else {
          }
        });
    },
  });

  return (
    <Box sx={{ display: 'grid', p: '1rem', gap: '1rem', maxWidth: '100vw' }}>
      <Paper sx={{ p: '1rem', borderRadius: '.5rem' }} elevation={1}>
        <Typography gutterBottom>What's on your mind?</Typography>
        <TextField
          variant="standard"
          id="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          placeholder="Something nice..."
          multiline
          error={!!formik.errors.body}
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
        <Post post={p} key={p._id} />
      ))}
    </Box>
  );
};

export default Home;
