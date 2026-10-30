const { loginUser } = require('../services/authService');

async function authHandler(req, res) {
  try {
    const { email, password } = req.body || {};
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { authHandler };
