const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// 🔌 Sub-schema for tracking socket connections
const ConnectionSchema = new Schema(
  {
    socketId: {
      type: String,
      index: true
    },
    connectedAt: {
      type: Date,
      default: Date.now
    },
    disconnectedAt: {
      type: Date
    },
    lastActiveAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

// 👤 Main User schema
const userSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    aboutStatus: {
      type: String,
      default: "📻 Hey there! I am using Walkie-Talkie"
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline"
    },
    connections: {
      type: [ConnectionSchema],
      default: []
    },
    rooms: {
      type: [String], // Change to [Schema.Types.ObjectId] if referencing a Room model
      default: []
    },
    otpSecret: {
      type: String
    },
    generatedAt: {
      type: Date,
      default: Date.now
      // expires: 300 // TTL: 5 minutes
    },
    profileImage: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

// Export model
module.exports = model("User", userSchema);
