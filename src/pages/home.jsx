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
import { Post } from '../components/Post';
import * as Yup from 'yup';
import axios from '../configs/axios';
import { useData } from '../contexts/DataContext';

// refactored out posts and postform components to
// prevent excessive render loads.
// prevent an entire page render for every key input
// by delegating the post input to its own component.

const Home = () => {
  const data = useData();

  const onSubmitPost = (values, formReset) => {
    axios
      .post('/posts', { body: values.body })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          formReset();
          data.updatePosts();
        } else {
          console.log(res.data);
          //handle failure
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ display: 'grid', p: '1rem', gap: '1rem', maxWidth: '100vw' }}>
      {console.log('rendering home page')}
      <PostInput onSubmit={onSubmitPost} />
      <Box>
        <Typography variant="h5" sx={{ marginTop: '.5rem' }}>
          Posts
        </Typography>
      </Box>
      <Posts posts={data.posts} />
    </Box>
  );
};

const Posts = ({ posts }) => {
  return (
    <>
      {console.log('rendering posts')}
      {posts.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </>
  );
};

const PostInput = ({ onSubmit }) => {
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
      onSubmit(values, formik.handleReset);
    },
  });
  return (
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
        <IconButton color="secondary">
          <ImageIcon />
        </IconButton>
        <IconButton color="secondary">
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
  );
};

export default Home;
