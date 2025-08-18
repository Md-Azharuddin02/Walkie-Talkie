const jwt = require("jsonwebtoken");
const config  = require("../config");

const generateToken = (user) => {
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const payload = {
    _id: user._id.toString(),
    phoneNumber: user.phoneNumber,
    name: user.name, // optional
  };

  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
};

module.exports = { generateToken, verifyToken };
