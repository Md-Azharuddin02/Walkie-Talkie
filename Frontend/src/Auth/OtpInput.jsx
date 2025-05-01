import React from 'react';
import { Box, Typography } from '@mui/material';

const OtpInput = ({ 
  otp, 
  handleOtpChange, 
  isOtpSent, 
  isLoading,
  error
}) => {
  return (
    <>
      <Box sx={{ 
        display: 'flex',
        gap: 1,
        justifyContent: 'center',
        marginTop: 2
      }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            disabled={!isOtpSent || isLoading}
            style={{
              width: '40px',
              height: '40px',
              textAlign: 'center',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              fontSize: '1.2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              '&:focus': {
                outline: 'none',
                borderColor: '#1976d2',
                boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
              }
            }}
            maxLength={1}
            autoComplete="off"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </Box>

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default OtpInput;