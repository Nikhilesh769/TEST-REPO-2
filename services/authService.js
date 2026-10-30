const User = require('../models/User');
const { generateToken, verifyPassword } = require('../utils/cryptoUtils');

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = verifyPassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.userId);

  return {
    userId: user.userId,
    email: user.email,
    token
  };
}

module.exports = { loginUser };
