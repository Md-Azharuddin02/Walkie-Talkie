const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Sub-schema for tracking socket connections
const ConnectionSchema = new Schema(
  {
    socketId:    { type: String, required: true, index: true },
    connectedAt: { type: Date,   default: Date.now },
    disconnectedAt: { type: Date },
    lastActiveAt:   { type: Date, default: Date.now }
  },
  { _id: false }
);

// Main User schema
const userSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
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
      type: [String],
      default: []
    },

    otpSecret: {
      type: String
    }, // Stores the OTP secret

    generatedAt: {
      type: Date,
      default: Date.now,
      // expires: 300 // TTL: 5 minutes
    },

    profileImage: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

// Model name 'User' => collection 'users'
const User = model("User", userSchema);

module.exports = User;
