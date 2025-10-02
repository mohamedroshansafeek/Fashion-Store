const paypal = require("@paypal/checkout-server-sdk");

const clientId = process.env.PAYPAL_CLIENT_ID || "AWEIC3aLC2a0Vj9_MvWnBsZwR4sThiiYmcWUZkTa3WZ6aaN3GBB0BnJfNm35JWp3_x_WivRuB1wq3bUP";
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "EOHGb0okwOH8hSuGs5GGJRzwlQBS6M-swdmNqH-KaC5Bbb5lYChYgrdAzv0HQZYc0iuxCHJxtKpo-mfh";

function environment() {
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client, paypal };

