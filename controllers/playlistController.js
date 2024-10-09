const Playlist = require('../models/playlist');
const { fetchSpotifyTrackDetails } = require('../services/spotifyService');

// Create a playlist
exports.createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const author = req.userId; // Assuming user authentication provides `userId`

    const newPlaylist = new Playlist({
      name,
      description,
      author,
      tracks: []
    });

    await newPlaylist.save();
    res.status(201).json({ message: 'Playlist created successfully', playlist: newPlaylist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create playlist', error });
  }
};

// Get all playlists
exports.getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate('author').populate('tracks');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch playlists', error });
  }
};

// Get a specific playlist by ID
exports.getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('author').populate('tracks');

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch playlist', error });
  }
};

// Update a playlist
exports.updatePlaylist = async (req, res) => {
  try {
    const { name, tracks } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    playlist.name = name || playlist.name;
    playlist.tracks = tracks || playlist.tracks;

    await playlist.save();
    res.json({ message: 'Playlist updated successfully', playlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update playlist', error });
  }
};

// Delete a playlist
exports.deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await playlist.remove();
    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete playlist', error });
  }
};

// Add track to playlist
exports.addTrackToPlaylist = async (req, res) => {
  const { playlistId, trackId } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    playlist.tracks.push(trackId);
    await playlist.save();

    res.json({ message: 'Track added successfully', playlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add track to playlist', error });
  }
};