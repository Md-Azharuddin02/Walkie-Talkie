// backend/services/otpService.js
const { authenticator } = require("otplib");

// Set OTP expiration time (5 minutes)
authenticator.options = { 
  step: 300, // 5 minutes expiry
  window: 1  // Allow 1 step before/after for time drift
};

// Generate a secret key (store in DB per user)
const getSecret = () => {
  return authenticator.generateSecret();
};

// Generate OTP
const generateOTP = (secret) => {
  return authenticator.generate(secret);
};

// Verify OTP
const verifyOTP = (token, secret) => {
  return authenticator.verify({ token, secret });
};

module.exports = { getSecret, generateOTP, verifyOTP };
