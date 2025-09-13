const UserModel = require("../Model/Users");
const { getSecret, generateOTP, verifyOTP } = require("./generateOtp");
const { generateToken } = require("../Service/authentication");
const {sendOTP}= require('./sendOTP')
const config = require("../config");

async function handleGetOtp(req, res) {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({
      success: false,
      error: "Phone number is required",
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

    const otp =  generateOTP(user.otpSecret);


    // Twilio integration---------------
    // sendOTP(phoneNumber, otp)


    // Twilio integration---------------
    // sendOTP(phoneNumber, otp)

    res.status(200).json({
      success: true,
      message: "OTP sent successfully!",
      otp: otp, // Only for development
    });
  } catch (err) {
    console.error("Error in handleGetOtp:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Internal server error",
    });
  }
}
async function handleVerifyOtp(req, res) {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) {
    return res.status(400).json({
      success: false,
      error: "Phone number and OTP are required",
    });
  }
  try {
    const user = await UserModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const isValid = verifyOTP(otp, user.otpSecret);

    if (isValid) {
      await UserModel.findOneAndUpdate(
        { phoneNumber },
        {
          $push: {
            connections: {connectedAt: new Date() },
          },
          $set: { status: "online" },
        }
      );
      await user.save();
      const token = generateToken(user);

      // Set cookie with appropriate options
      res.cookie("token", token, {
        httpOnly: true,
        secure: config.JWT_SECRET,
        sameSite: "None", // "None" if frontend & backend are on different domains
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });

      res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Invalid OTP",
      });
    }
  } catch (err) {
    console.error("Error in handleVerifyOtp:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Internal server error",
    });
  }
}

module.exports = { handleGetOtp, handleVerifyOtp };
