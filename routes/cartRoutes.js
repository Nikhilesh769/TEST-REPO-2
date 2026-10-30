const express = require('express');
const { cartHandler } = require('../controllers/cartController');

const router = express.Router();

router.post('/checkout', cartHandler);

module.exports = router;
