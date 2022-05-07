import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../configs/axios';
import { LoadingButton } from '@mui/lab';
import local from '../helpers/localStorage';
import { useAuth } from '../contexts/AuthContext';
import GoogleButton from '../components/GoogleButton';

const Login = () => {
  const theme = useTheme();
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleRedirect = () => {
    navigate('/register');
  };

  useEffect(() => {
    axios.get('/users/me').then((res) => {
      if (res.data.success && res.data.user) {
        console.log(res.data);
        auth.signin(res.data.user, () => {
          navigate('/');
        });
      }
    });
  }, []);

  const onGoogleSignIn = ({
    googleId,
    tokenId,
    accessToken,
    tokenObj,
    profileObj,
  }) => {
    axios
      .post('/login/google', { tokenId })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          local.setJwt(res.data.token);
          auth.signin(res.data.user, () => {
            console.log('renavigating to home');
            navigate('/');
          });
        }
      })
      .catch((err) => setError(err.message));
  };

  const onTestAccLogin = () => {
    axios
      .post('/login', { username: 'tester1', password: 'tester1' })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          local.setJwt(res.data.token);
          auth.signin(res.data.user, () => {
            navigate('/');
          });
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => setError(err.message));
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
      setLoading(true);
      axios
        .post('/login', {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            if (res.data.success) {
              local.set('jwt', res.data.token);
              auth.signin(res.data.user, () => {
                navigate('/');
              });
            } else {
              setError(res.data.message);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
          setLoading(false);
        });
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
      <LoadingButton
        loading={loading}
        onClick={formik.handleSubmit}
        sx={{ padding: '.5rem' }}
        variant="contained"
      >
        <Typography variant="subtitle2">Login</Typography>
      </LoadingButton>

      <Divider>or</Divider>

      <GoogleButton text={' Login With Google'} onSuccess={onGoogleSignIn} />

      <Divider sx={{ margin: '1rem 0' }} />

      <Typography sx={{ textAlign: 'center' }}>
        Want to join us?{' '}
        <Link onClick={handleRedirect} underline="hover">
          Sign up here!
        </Link>
      </Typography>

      <Divider>or</Divider>

      <Button
        onClick={onTestAccLogin}
        sx={{ padding: '.5rem' }}
        variant="contained"
      >
        <Typography variant="subtitle2">Login with a Test Account</Typography>
      </Button>
    </Box>
  );
};

export default Login;
