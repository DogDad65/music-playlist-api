const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const artistRoutes = require('./routes/artistRoutes');
const trackRoutes = require('./routes/trackRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const authRoutes = require('./routes/authRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');

dotenv.config();
const app = express();

// Use CORS and JSON middleware before routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from frontend
}));
app.use(express.json());

// Define routes
app.use('/api', artistRoutes);
app.use('/api', trackRoutes);
app.use('/api', playlistRoutes);
app.use('/auth', authRoutes);
app.use('/api', spotifyRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
