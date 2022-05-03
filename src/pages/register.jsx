import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'grid',
        justifyContent: 'center',
        padding: '1rem',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Signup Page
      </Typography>
      <Paper color="secondary" elevation={1} sx={{ padding: '1rem' }}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Join the lovely community and interact with{' '}
          <Typography
            sx={{ textAlign: 'center' }}
            color="secondary"
            variant="body1"
            component="span"
          >
            tens
          </Typography>{' '}
          of other beautiful people.
        </Typography>
      </Paper>
      <TextField label="Username" placeholder="Username" />
      <TextField label="Password" placeholder="Password" type="password" />
      <TextField
        label="Repeat Password"
        placeholder="Repeat Password"
        type="password"
      />
      <Button variant="outlined" sx={{ padding: '.5rem' }}>
        Sign up
      </Button>

      <Divider>
        <Typography variant="body1">or</Typography>
      </Divider>
      <Button variant="contained" sx={{ padding: '.5rem' }}>
        <GoogleIcon sx={{ mr: '.5rem' }} /> Sign up with Google
      </Button>

      <Divider sx={{ margin: '1rem 0' }} />

      <Typography sx={{ textAlign: 'center' }}>
        Already a member?
        <Link onClick={handleClick} variant="body1" underline="hover">
          {' '}
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
