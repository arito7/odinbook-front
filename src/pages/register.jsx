import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import * as Yup from 'yup';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { useFormik } from 'formik';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rpassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, 'Username must be at least 6 characters long.')
        .max(20, 'Username is too long.')
        .matches(
          /^[a-z0-9]+$/i,
          'Username cannot consist of non-alphanumeric characters.'
        )
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long.')
        .max(20, 'Password is too long.')
        .required('Password is required'),
      rpassword: Yup.string().when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onLoginRedirect = () => {
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
      <Paper
        variation="outline"
        sx={{
          padding: '1rem',
        }}
      >
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Join the lovely community and interact with{' '}
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: theme.palette.secondary.main,
            }}
            variant="body1"
            component="span"
          >
            tens
          </Typography>{' '}
          of other beautiful people.
        </Typography>
      </Paper>
      <TextField
        id="username"
        label="Username"
        placeholder="Username"
        error={formik.errors.username}
        value={formik.values.username}
        onChange={formik.handleChange}
        helperText={formik.errors.username}
      />
      <TextField
        id="password"
        label="Password"
        placeholder="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
        helperText={formik.errors.password}
      />
      <TextField
        id="rpassword"
        value={formik.values.rpassword}
        onChange={formik.handleChange}
        error={formik.errors.rpassword}
        helperText={formik.errors.rpassword}
        label="Repeat Password"
        placeholder="Repeat Password"
        type="password"
      />
      <Button
        onClick={formik.handleSubmit}
        variant="outlined"
        sx={{ padding: '.5rem' }}
      >
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
