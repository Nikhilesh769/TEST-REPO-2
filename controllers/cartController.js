const { processCart } = require('../services/cartService');

async function cartHandler(req, res) {
  try {
    const result = await processCart(req.body || {});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Cart processing failed' });
  }
}

module.exports = { cartHandler };
