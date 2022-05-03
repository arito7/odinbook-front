import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/register');
  };
  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'grid',
        gap: '1rem',
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', margin: '1rem' }}>
        Login page
      </Typography>
      <TextField label="Username" variant="outlined" />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        inputMode="password"
      />
      <Button sx={{ padding: '.5rem' }} variant="contained">
        <Typography variant="subtitle2">Login</Typography>
      </Button>

      <Divider>or</Divider>

      <Button
        className="text-btn"
        variant="contained"
        sx={{ padding: '.5rem' }}
      >
        <GoogleIcon sx={{ mr: '1rem' }} />
        <Typography variant="subtitle2">Login with Google</Typography>
      </Button>

      <Divider sx={{ margin: '1rem 0' }} />

      <Typography sx={{ textAlign: 'center' }}>
        Want to join us?{' '}
        <Link onClick={handleRedirect} underline="hover">
          Sign up here!
        </Link>
      </Typography>

      <Divider>or</Divider>

      <Button sx={{ padding: '.5rem' }} variant="contained">
        <Typography variant="subtitle2">Login with a Test Account</Typography>
      </Button>
    </Box>
  );
};

export default Login;
