const UserModel = require("../Model/Users");
const { getSecret, generateOTP, verifyOTP } = require("./generateOtp");
const { generateToken } = require("../Service/authentication");
const { getIO } = require('../Service/socket');


async function handleGetOtp(req, res) {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      error: "Phone number is required"
    });
  }

  try {
    let user = await UserModel.findOne({ phoneNumber });

    if (!user) {
      const secret = getSecret();

      user = new UserModel({
        phoneNumber,
        otpSecret: secret,

        name: `User_${phoneNumber.slice(-4)}`,
      });
      await user.save();
    }

    const otp = generateOTP(user.otpSecret);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully!",
      otp: otp // Only for development
    });
  } catch (err) {
    console.error('Error in handleGetOtp:', err);
    res.status(500).json({
      success: false,
      error: err.message || "Internal server error"
    });
  }
}
async function handleVerifyOtp(req, res) {
  const { phoneNumber, otp, socketId} = req.body;
  console.log("socketId:", socketId);
  if (!phoneNumber || !otp) {
    return res.status(400).json({
      success: false,
      error: "Phone number and OTP are required"
    });
  }
  try {
    const user = await UserModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    const isValid = verifyOTP(otp, user.otpSecret);

    if (isValid) {
      await UserModel.findOneAndUpdate(
        { phoneNumber },
        {
          $push: {
            connections: { socketId, connectedAt: new Date() }
          },
          $set: { status: 'online' }
        },
        { new: true }
      );

      await user.save();
      const token = generateToken(user);
      
      // Set cookie with appropriate options
      res.cookie('token', token);
      

      res.status(200).json({
        success: true,
        message: "OTP verified successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Invalid OTP"
      });
    }
  } catch (err) {
    console.error('Error in handleVerifyOtp:', err);
    res.status(500).json({
      success: false,
      error: err.message || "Internal server error"
    });
  }
}

module.exports = { handleGetOtp, handleVerifyOtp };
