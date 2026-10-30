const express = require('express');
const { authHandler } = require('../controllers/authController');

const router = express.Router();

router.post('/login', authHandler);

module.exports = router;
