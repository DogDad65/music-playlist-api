const express = require('express');
const router = express.Router();
const { getTrack, addCommentToTrack } = require('../controllers/trackController');

// Track routes
router.get('/tracks/:id', getTrack);
router.post('/tracks/:id/comment', addCommentToTrack);

module.exports = router;
