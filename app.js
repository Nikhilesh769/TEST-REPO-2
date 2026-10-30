const express = require('express');
const cors = require('cors');
require('dotenv').config();

const logger = require('./config/logger');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
