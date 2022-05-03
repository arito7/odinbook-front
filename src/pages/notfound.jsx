import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { ArrowBackIosNewRounded } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <Box
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        gap: '1rem',
      }}
    >
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        404
      </Typography>
      <Typography varaint="body1">
        Oops! looks like this page doesn't exist !
      </Typography>
      <Button onClick={handleClick} variant="outlined" component="button">
        <ArrowBackIosNewRounded sx={{ mr: '.5rem' }} />
        Go back home
      </Button>
    </Box>
  );
};

export default NotFound;
