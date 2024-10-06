const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
});

module.exports = mongoose.model('Artist', artistSchema);
