import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ENDPOINT = 'http://localhost:5000';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleRedirect = () => {
    navigate('/register');
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, 'Username must be at least 6 characters long.')
        .max(20, 'Username is too long.')
        .matches(
          /^[a-z0-9]+$/i,
          'Your username should not consist of any non-alphanumeric characters.'
        )
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long.')
        .max(20, 'Password is too long.')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
      {error ? (
        <Paper
          variant="outlined"
          sx={{
            padding: '1rem',
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>{error}</Typography>
        </Paper>
      ) : null}
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
        helperText={formik.errors.username}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        inputMode="password"
        error={formik.errors.password}
        helperText={formik.errors.password}
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Button
        onClick={formik.handleSubmit}
        sx={{ padding: '.5rem' }}
        variant="contained"
      >
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
