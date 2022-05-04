import {
  CommentRounded,
  ShareRounded,
  ThumbUpAltRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Divider,
  Typography,
} from '@mui/material';
import moment from 'moment';

export const Post = ({ post }) => (
  <Paper sx={{ p: '1rem', position: 'relative', display: 'grid' }}>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: '.5rem',
        alignItems: 'center',
        marginTop: '-.5rem',
      }}
    >
      <Avatar alt="Test icon" src="/images/man.png" />
      <Box sx={{ display: 'grid', alignItems: 'center' }}>
        <Typography>{post.creator.username}</Typography>
        <Typography variant="subtitle2" color="grey">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>

    <Divider sx={{ margin: '.5rem -1rem' }} />

    <Typography component="p" sx={{ overflowWrap: 'anywhere' }}>
      {post.body}
    </Typography>

    <Box sx={{ margin: '.5rem 0 -.5rem 0' }}>
      <IconButton>
        <ThumbUpAltRounded />
      </IconButton>
      <IconButton>
        <ShareRounded />
      </IconButton>
      <IconButton>
        <CommentRounded />
      </IconButton>
    </Box>
  </Paper>
);
