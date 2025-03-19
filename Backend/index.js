const express = require("express");

const cors = require("cors");
const http = require("http");
const connectDB = require("./DBConnection");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const router = require("./Routes/Routes");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8000", // Allow frontend to connect
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", router);

// // MongoDB Connection
connectDB();

// // Socket.IO Connection
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Handle chat messages
//   socket.on("sendMessage", (message) => {
//     io.emit("receiveMessage", message); // Broadcast the message to all users
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});