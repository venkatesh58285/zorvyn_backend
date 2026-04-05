const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("⚠ MongoDB connection error:", error.message);
    console.log("Server will run but database operations may fail.");
    console.log(
      "Fix: Ensure MongoDB Atlas cluster is accessible or use local MongoDB",
    );
  }
};

module.exports = connectDB;
