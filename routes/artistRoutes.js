const express = require('express');
const router = express.Router();
const { createArtist, getAllArtists } = require('../controllers/artistController');

// Artist routes
router.post('/artists', createArtist);
router.get('/artists', getAllArtists);

module.exports = router;
