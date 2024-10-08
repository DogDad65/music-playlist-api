const User = require('../models/user');
const jwt = require('jsonwebtoken');

// User sign-up
exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    // Respond with success
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Sign-up failed', error });
  }
};

// User login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify the password
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token (assuming you have a token generation method)
    const token = "your-generated-token"; // Replace with actual token generation logic
    res.json({ token });
  } catch (error) {
    console.error("Server error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
