const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const friendListSchema = [
  {
    id: 1,
    name: "Emma Johnson",
    message: "Are we still on for today?",
    time: "11:20 AM",
    unreadCount: 1,
    phoneNumber: "1111111111",
  },
  {
    id: 2,
    name: "Liam Smith",
    message: "Got it, thanks!",
    time: "9:45 AM",
    unreadCount: 2,
    phoneNumber: "2222222222",
  },
  {
    id: 3,
    name: "Olivia Davis",
    message: "Let me know when you’re free.",
    time: "2:10 PM",
    unreadCount: 3,
    phoneNumber: "3333333333",
  },
];

const userSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    socketId: {
      type: String,
      // required: true,
      // unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    aboutStatus: {
      type: String,
      default: "📻 Hey there! I am using Walkie-Talkie",
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    friendList: {
       type: Array,
       default: [...friendListSchema],
    },
    rooms: {
      type: [String], // Change to [Schema.Types.ObjectId] if referencing a Room model
      default: [],
    },
    otpSecret: {
      type: String,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
      // expires: 300 // TTL: 5 minutes
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Export model
module.exports = model("User", userSchema);
