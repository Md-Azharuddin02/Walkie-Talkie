// Auth/tokenAuthenticate.js
const { verifyToken } = require("../Service/authentication");

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "token";

const authenticate = (req, res, next) => {
  // 1) Try cookie
  const cookieToken =
    req.cookies && typeof req.cookies[COOKIE_NAME] === "string"
      ? req.cookies[COOKIE_NAME]
      : null;

  // 2) Try Authorization: Bearer <jwt>
  const auth = req.get("authorization");
  const headerToken =
    auth && /^Bearer\s+/i.test(auth) ? auth.replace(/^Bearer\s+/i, "").trim() : null;

  // 3) Optional: ?token=<jwt>
  const queryToken =
    req.query && typeof req.query.token === "string" ? req.query.token.trim() : null;

  const token = cookieToken || headerToken || queryToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: token missing" });
  }

  const user = verifyToken(token); // must accept a string and return payload or null

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }

  req.user = user; // attach decoded payload
  next();
};

module.exports = { authenticate };
