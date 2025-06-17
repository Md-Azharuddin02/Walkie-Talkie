// server/Routes/Routes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ─── MULTER SETUP ───────────────────────────────────────────────────────────────
const multer = require("multer");
const path = require("path");

// Configure diskStorage so that Multer drops files into “server/uploads/”
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save all uploads into <project-root>/server/uploads/
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    // Use Date.now() + original extension, to avoid collisions
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// Create “upload” middleware, expecting a single field called “image”
const upload = multer({ storage });

// ─── CONTROLLERS ────────────────────────────────────────────────────────────────
const {
  getUser,
  addUser,
  getUserProfile,
  updateProfile,
} = require("../Controller/users");
const { handleGetOtp, handleVerifyOtp } = require("../Auth/OTP_Validation");
const { getMessages, sendMessage } = require("../Controller/messages");
const { authenticate } = require("../Auth/tokenAuthenticate");

// ─── USER / PROFILE ROUTES ───────────────────────────────────────────────────────
// GET /api/users           → get all users
router.get("/user", authenticate, getUser);

// POST /api/users          → add a new user (no file upload here)
router.post("/user", addUser);

// POST /api/update-profile → update name/about + one image
//   • “upload.single('image')” must come before your controller
router.post("/update-profile", upload.single("image"), updateProfile);

// You can put OTP routes or other protected routes here:
router.post("/auth/send-otp", handleGetOtp);
router.post("/auth/verify-otp", handleVerifyOtp);

// ─── MESSAGES (example) ─────────────────────────────────────────────────────────

const users = require('../Model/Users')
const message = require('../Model/Message')



router.get("/messages", getMessages);
router.post("/messages", sendMessage);

// ─── EXPORT THE ROUTER ───────────────────────────────────────────────────────────
module.exports = router;
