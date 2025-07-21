// db.js or mongoConnection.js
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Mongoose connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Mongoose connection error:", err);
    process.exit(1); // optional: exit on failure
  }
}

module.exports = connectDB
