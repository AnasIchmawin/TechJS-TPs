// create user 
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const router = express.Router();    

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    
    await user.save();
    
    // Return user without password
    const userResponse = {
      _id: user._id,
      username: user.username
    };
    
    res.status(201).json(userResponse);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});


module.exports = router;