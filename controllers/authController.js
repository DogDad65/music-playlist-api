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
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user || !(await user.isValidPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with token and user data
    res.status(200).json({ token, userId: user._id, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
