import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Google as GoogleIcon } from '@mui/icons-material';

const Login = () => {
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
        <Typography variant="subtitle2">Login with a Test Account</Typography>
      </Button>

      <Button
        className="text-btn"
        variant="contained"
        sx={{ padding: '.5rem' }}
      >
        <GoogleIcon sx={{ mr: '1rem' }} />
        <Typography variant="subtitle2">Login with Google</Typography>
      </Button>
    </Box>
  );
};

export default Login;
