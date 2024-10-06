const express = require('express');
const router = express.Router();
const { createPlaylist, getAllPlaylists, getPlaylist, updatePlaylist, deletePlaylist, addTrackToPlaylist } = require('../controllers/playlistController');
const authenticate = require('../middleware/authenticate');  // Import your authentication middleware if needed

// POST route to create a playlist
router.post('/playlists', authenticate, createPlaylist);

// GET route to get all playlists
router.get('/playlists', getAllPlaylists);

// GET route to get a specific playlist by ID
router.get('/playlists/:id', getPlaylist);

// PUT route to update a playlist
router.put('/playlists/:id', authenticate, updatePlaylist);

// DELETE route to delete a playlist
router.delete('/playlists/:id', authenticate, deletePlaylist);

// POST route to add a track to a playlist
router.post('/playlists/add-track', authenticate, addTrackToPlaylist);

module.exports = router;
