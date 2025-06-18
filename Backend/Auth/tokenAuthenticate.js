const { verifyToken } = require("../Service/authentication");

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized not found" });
    }
    const user = verifyToken(token);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized user not found" });
    }
    req.user = user;
    next();
};

module.exports = { authenticate };