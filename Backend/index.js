// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");
const router = require("./Routes/Routes");
const { init: initSocket } = require("./Service/socket");

const app = express();

// ─── Ensure uploads folder exists ─────────────────────────────────────────────
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files
app.use("/uploads", express.static(uploadsDir));

// ─── Rate Limiting for OTP ────────────────────────────────────────────────────
const otpLimiter = rateLimit({
  windowMs: 60_000, // 1 minute
  max: 50, // max 5 requests per window per IP
  message: {
    success: false,
    error: "Too many OTP requests. Please try again later.",
  },
});
app.use("/api/auth/send-otp", otpLimiter);
app.use("/api/auth/verify-otp", otpLimiter);

// Trust proxy if in production (for secure cookies, etc.)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// ─── Database & Routes ────────────────────────────────────────────────────────
const connectDB = require("./DBConnection");
connectDB(); // connect to MongoDB
app.use("/api", router); // mount your API routes

// ─── Create Server & Socket.IO ───────────────────────────────────────────────
const server = http.createServer(app);
const io = initSocket(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

// (Optional) export io if you need to emit from other modules
module.exports = { io };

// ─── Start Listening ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5804;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
