// db.js or mongoConnection.js
const config = require("./config");
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(config.mongouri);
    console.log("✅ Mongoose connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Mongoose connection error:", err);
    process.exit(1); // optional: exit on failure
  }
}

module.exports = connectDB
