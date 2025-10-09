const mongoose = require("mongoose");
const { Schema, model } = mongoose;



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

    friendList: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User"
        }
      }
    ],

    rooms: {
      type: [String],
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
    timestamps: true, 
  }
);

module.exports = model("User", userSchema);
