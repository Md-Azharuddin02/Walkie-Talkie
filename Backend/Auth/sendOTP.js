const config = require("../config");
const twilio = require("twilio");


// Load Twilio credentials from environment
if (!config.twilioSid || !config.twilioToken || !config.twilioPhone) {
  throw new Error(
    "Twilio credentials are missing! Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE in your environment."
  );
}

// Create Twilio client

const client = twilio(config.twilioSid, config.twilioToken);
/**
 * Send OTP to a phone number
 * @param {string} phoneNumber - e.g., '9876543210'
 * @param {string} otp - 6-digit OTP
 */
async function sendOTP(phoneNumber, otp) {

  try {
    const message = await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: config.twilioPhone, // Use env-configured Twilio number
      to: `+91${phoneNumber}`, // Add country code dynamically
    });
    return message;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; // propagate error to the caller
  }
}

module.exports = { sendOTP };
