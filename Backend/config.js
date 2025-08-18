const path = require('path');
const dotenv = require('dotenv');

// Determine environment
const env = process.env.NODE_ENV || 'development';

// Load the corresponding .env file
const envPath = path.resolve(__dirname, `.env.${env}`);
console.log(`📦 Loading env file: ${envPath}`);
dotenv.config({ path: envPath });

// Export config values
module.exports = {
  port: process.env.PORT || 5804,
  mongouri: process.env.MONGODB_URL,
  twilioSid: process.env.TWILIO_ACCOUNT_SID,
  twilioToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhone: process.env.TWILIO_PHONE,
  jwtSecret: process.env.JWT_SECRET,
  api_base_url: process.env.API_BASE_URL || 'http://localhost:5173',
  nodeEnv: env,
};
