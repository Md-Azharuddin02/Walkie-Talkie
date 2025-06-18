
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const payload = {
        _id: user._id.toString(),
        phoneNumber: user.phoneNumber,
        name: user.name,
        profileImage: user.profileImage,
        status: user.status,
        aboutStatus: user.aboutStatus,
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

module.exports = { generateToken, verifyToken };