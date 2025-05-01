import React from 'react';
import { Link, Box } from '@mui/material';

const ActionLinks = ({
  phone,
  isLoading,
  remainingTime,
  handleChangeNumber,
  handleSendOTP
}) => {
  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 1
    }}>
      <Link
        component="button"
        variant="body2"
        onClick={handleChangeNumber}
        disabled={!phone || isLoading}
        sx={{
          cursor: 'pointer',
          color: '#1976d2',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          },
          '&.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.38)',
            pointerEvents: 'none'
          }
        }}
      >
        Change Number
      </Link>
      <Link
        component="button"
        variant="body2"
        onClick={handleSendOTP}
        disabled={!phone || isLoading || remainingTime > 0}
        sx={{
          cursor: 'pointer',
          color: '#1976d2',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          },
          '&.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.38)',
            pointerEvents: 'none'
          }
        }}
      >
        {remainingTime > 0 ? `Resend OTP in ${remainingTime}s` : 'Send OTP'}
      </Link>
    </Box>
  );
};

export default ActionLinks;