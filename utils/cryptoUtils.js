const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function hashPassword(plainText) {
  return bcrypt.hashSync(plainText, 10);
}

function verifyPassword(plainText, passwordHash) {
  return bcrypt.compareSync(plainText, passwordHash);
}

function generateToken(userId) {
  const secret = process.env.JWT_SECRET || 'mock-secret';
  return jwt.sign({ sub: userId }, secret, { expiresIn: '1h' });
}

module.exports = { hashPassword, verifyPassword, generateToken };
