// Auth/tokenAuthenticate.js
const { verifyToken } = require("../Service/authentication");


const authenticate = (req, res, next) => {
  const token = req.cookies?.token
  console.log("🔑 Authenticating user with token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: token missing" });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }

  req.user = user; // attach decoded payload
  next();
};

module.exports = { authenticate };
