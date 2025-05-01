import React from 'react';
import { TextField, Box } from '@mui/material';

const PhoneInput = ({ 
  phone, 
  handlePhoneChange, 
  error, 
  disabled 
}) => {
  return (
    <TextField
      fullWidth
      label="Phone Number"
      value={phone}
      onChange={handlePhoneChange}
      error={!!error}
      helperText={error}
      disabled={disabled}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
          '& fieldset': { 
            borderColor: 'rgba(0, 0, 0, 0.1)'
          },
          '&:hover fieldset': { 
            borderColor: 'rgba(25, 118, 210, 0.5)'
          }
        }
      }}
      inputProps={{ 
        maxLength: 10,
        inputMode: 'numeric',
        pattern: '[0-9]*'
      }}
      margin="normal"
    />
  );
};

export default PhoneInput;