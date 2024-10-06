const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  comments: [{ type: String }]
});

module.exports = mongoose.model('Track', trackSchema);
