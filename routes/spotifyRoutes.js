const express = require('express');
const router = express.Router();
const { searchSpotifyTracks } = require('../services/spotifyService');

// Route to search for tracks on Spotify
router.get('/spotify/tracks', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const tracks = await searchSpotifyTracks(query);
    res.json(tracks);  // Send back the tracks to the client
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tracks from Spotify', error });
  }
});

module.exports = router;
