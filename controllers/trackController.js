const Track = require('../models/track');

// Get single track and comments
exports.getTrack = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id).populate('artist');
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch track' });
  }
};

// Add a comment to a track
exports.addCommentToTrack = async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    track.comments.push(req.body.comment);
    await track.save();
    res.status(201).json(track);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
