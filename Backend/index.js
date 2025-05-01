const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./DBConnection");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const router = require("./Routes/Routes");
const cookieParser = require("cookie-parser");
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const profilesDir = path.join(uploadsDir, 'profiles');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(profilesDir)) {
    fs.mkdirSync(profilesDir);
}

const app = express();
const server = http.createServer(app);

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
};

// Rate limiting for OTP endpoints
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { 
    success: false, 
    error: "Too many OTP requests. Please try again later." 
  }
});

// Socket.IO setup with CORS
const io = socketIo(server, {
  cors: corsOptions
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Apply rate limiting to OTP routes
app.use('/api/auth/send-otp', otpLimiter);
app.use('/api/auth/verify-otp', otpLimiter);

// Trust proxy for secure cookies in production
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use("/api", router);

// MongoDB Connection
connectDB();

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5804;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
