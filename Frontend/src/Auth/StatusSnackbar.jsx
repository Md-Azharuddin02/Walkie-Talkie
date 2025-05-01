import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const StatusSnackbar = ({ 
  open, 
  message, 
  severity, 
  handleClose 
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default StatusSnackbar;