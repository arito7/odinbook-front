import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { useFormik } from 'formik';
import axios from '../configs/axios';
import { LoadingButton } from '@mui/lab';
import GoogleButton from '../components/GoogleButton';
import local from '../helpers/localStorage';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const theme = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(''); // Error message that appears at the top of the form used for handling response from BE
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      axios
        .post('/register', {
          username: values.username,
          password: values.password,
          rpassword: values.rpassword,
        })
        .then((res) => {
          if (res.data.success) {
            local.setJwt(res.data.token);
            auth.signin(res.data.user, () => {
              navigate('/');
            });
          } else {
            setError(res.data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    },
  });

  const onGoogleSignUp = ({
    googleId,
    tokenId,
    accessToken,
    tokenObj,
    profileObj,
  }) => {
    axios
      .post('/register/google', { tokenId, profileObj })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          local.setJwt(res.data.token);
          navigate('/');
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

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
      {error ? (
        <Paper
          sx={{
            backgroundColor: theme.palette.error.main,
            padding: '1rem',
            color: theme.palette.error.contrastText,
          }}
        >
          <Typography sx={{ textAlign: 'center' }}>{error}</Typography>
        </Paper>
      ) : null}
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
      <LoadingButton
        loading={loading}
        onClick={formik.handleSubmit}
        variant="outlined"
        sx={{ padding: '.5rem' }}
      >
        Sign up
      </LoadingButton>

      <Divider>
        <Typography variant="body1">or</Typography>
      </Divider>

      <GoogleButton text={' Sign up with Google'} onSuccess={onGoogleSignUp} />

      <Divider sx={{ margin: '1rem 0' }} />

      <Typography sx={{ textAlign: 'center' }}>
        Already a member?{' '}
        <Link onClick={onLoginRedirect} variant="body1" underline="hover">
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
