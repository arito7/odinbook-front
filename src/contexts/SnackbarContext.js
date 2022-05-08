import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = useState(false);

  const onClose = (reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  /**
   * A shorthand function to set message, severity and show alert at once
   * @param {*} message
   * @param {'error'|'warning'|'info'|'success'} severity
   */
  const show = (
    message = 'You need to set a message',
    severity = 'success'
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const value = { setMessage, setSeverity, setOpen, show };

  return (
    <SnackbarContext.Provider value={value}>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        onClose={onClose}
      >
        <Alert severity={severity} onClose={onClose}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}
