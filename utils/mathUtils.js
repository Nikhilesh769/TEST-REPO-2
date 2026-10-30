const _ = require('lodash');

function calculateDiscount(subtotal, discountPercent) {
  const safePercent = _.clamp(Number(discountPercent) || 0, 0, 100);
  const discountAmount = _.round((subtotal * safePercent) / 100, 2);

  return {
    discountPercent: safePercent,
    discountAmount,
    finalTotal: _.round(subtotal - discountAmount, 2)
  };
}

module.exports = { calculateDiscount };
