const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const artistRoutes = require('./routes/artistRoutes');
const trackRoutes = require('./routes/trackRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const authRoutes = require('./routes/authRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Use Routes
app.use('/api', artistRoutes);
app.use('/api', trackRoutes);
app.use('/api', playlistRoutes);
app.use('/auth', authRoutes);
app.use('/api', spotifyRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



  app.listen(3000, () => {
  console.log('Server running on port 3000');
});
