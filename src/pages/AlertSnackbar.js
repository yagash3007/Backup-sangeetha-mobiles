import React from 'react';
import { Snackbar, Alert } from '@mui/material';


const AlertSnackbar = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity="warning" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
