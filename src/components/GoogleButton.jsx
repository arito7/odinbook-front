import { Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import GoogleLogin from 'react-google-login';
import { Typography } from '@mui/material';

const GoogleButton = ({ text, onSuccess }) => {
  const onFailure = (err, details) => {
    console.log(err, details);
  };

  return (
    <GoogleLogin
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          className="text-btn"
          variant="contained"
          sx={{ padding: '.5rem' }}
        >
          <GoogleIcon sx={{ mr: '1rem' }} />
          <Typography variant="subtitle2">{text}</Typography>
        </Button>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      clientId="354732009283-p8t311qroram713iu2jn90trpoe7vvp5.apps.googleusercontent.com"
    />
  );
};

export default GoogleButton;
