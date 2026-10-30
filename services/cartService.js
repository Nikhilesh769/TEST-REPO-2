const axios = require('axios');
const moment = require('moment');
const { calculateDiscount } = require('../utils/mathUtils');

async function processCart(cart) {
  const items = cart.items || [];

  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const discount = calculateDiscount(subtotal, cart.discountPercent);

  let taxRate = 0.08;
  try {
    const response = await axios.get('https://api.mocktax.example.com/rate', {
      timeout: 2000
    });
    taxRate = response.data.rate || taxRate;
  } catch (err) {
    // Fall back to the default tax rate when the external service is unavailable.
  }

  const tax = subtotal * taxRate;

  return {
    subtotal,
    discount,
    tax,
    total: subtotal - discount.discountAmount + tax,
    processedAt: moment().toISOString()
  };
}

module.exports = { processCart };
