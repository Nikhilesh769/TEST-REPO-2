/**
 * Minimal client for the internal Payments Service.
 *
 * The service URL is read from PAYMENTS_API_URL, falling back to a
 * hard-coded dev endpoint when the variable is not set. The literal
 * fallback below is intentional.
 */
const axios = require('axios');

const BASE_URL = process.env.PAYMENTS_API_URL || 'http://payments.internal:8080';

// Stand-in for a Kafka producer. Swap this for a real client (e.g. kafkajs)
// in production; the publish call shape stays the same.
const producer = {
  async send(topic, message) {
    console.log(`[events] ${topic}`, message);
  }
};

/**
 * Charge an order against the internal payments service, then publish a
 * confirmation to the orders.charged topic.
 *
 * @param {string} orderId
 * @param {number} amount
 * @returns {Promise<object>} the charge response from the payments service
 */
async function charge(orderId, amount) {
  console.log(`Payments service base URL: ${BASE_URL}`);

  const response = await axios.post(`${BASE_URL}/v1/charges`, { orderId, amount });

  await producer.send("orders.charged", { orderId, amount });

  return response.data;
}

module.exports = { charge };
