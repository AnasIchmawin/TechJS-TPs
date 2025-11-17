const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/expressDB", {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("MongoDB Connected to expressDB database...");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.log("Please ensure MongoDB is running on localhost:27017");
    console.log("Or update the connection string to use MongoDB Atlas");
    console.log("The server will continue running, but database features won't work.");
  }
};

module.exports = connectDB;