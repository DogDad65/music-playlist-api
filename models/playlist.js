const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // reference the user
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
});

module.exports = mongoose.model('Playlist', playlistSchema);
