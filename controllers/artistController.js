const Artist = require('../models/artist');

// Create an artist
exports.createArtist = async (req, res) => {
  try {
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create artist' });
  }
};

// Get all artists
exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
};
