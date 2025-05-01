import React from 'react';
import { Link } from '@mui/material';

const VerifyButton = ({ handleVerifyOTP, isLoading }) => {
  return (
    <Link
      component="button"
      variant="body2"
      onClick={handleVerifyOTP}
      disabled={isLoading}
      sx={{
        cursor: 'pointer',
        color: '#1976d2',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'center',
        marginTop: 2,
        '&:hover': {
          textDecoration: 'underline'
        },
        '&.Mui-disabled': {
          color: 'rgba(0, 0, 0, 0.38)',
          pointerEvents: 'none'
        }
      }}
    >
      Verify OTP
    </Link>
  );
};

export default VerifyButton;