const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/authController');

// POST /auth/signup
router.post('/signup', signUp);

// POST /auth/login
router.post('/login', login);

module.exports = router;
