import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/system';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const onSignup = () => {
    if (usernameError) {
      return;
    }
    if (!username) {
      setUsernameError('Username cannot be empty.');
      return;
    }
  };

  const onLoginRedirect = () => {
    navigate('/login');
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length < 7) {
      setUsernameError(
        'Username must be at least 6 alphanumeric characters long.'
      );
      // check for non alpha numeric characters
    } else if (!/^[a-z0-9]+$/.test(e.target.value)) {
      setUsernameError(
        'Username cannot consist of non-alphanumeric characters.'
      );
    } else if (e.target.value.length > 19) {
      setUsernameError('Username is too long!');
    } else setUsernameError('');
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
      <Paper
        elevation={1}
        sx={{
          padding: '1rem',
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.contrastText,
        }}
      >
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Join the lovely community and interact with{' '}
          <Typography
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
            variant="body1"
            component="span"
          >
            tens
          </Typography>{' '}
          of other beautiful people.
        </Typography>
      </Paper>
      <TextField
        label="Username"
        placeholder="Username"
        error={usernameError}
        value={username}
        onChange={onUsernameChange}
        helperText={usernameError}
      />
      <TextField label="Password" placeholder="Password" type="password" />
      <TextField
        label="Repeat Password"
        placeholder="Repeat Password"
        type="password"
      />
      <Button onClick={onSignup} variant="outlined" sx={{ padding: '.5rem' }}>
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
        <Link onClick={onLoginRedirect} variant="body1" underline="hover">
          {' '}
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
