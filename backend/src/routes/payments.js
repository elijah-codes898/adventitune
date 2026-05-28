const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Initiate a payment via Flutterwave
router.post('/initiate', requireAuth, async (req, res) => {
  // TODO: call Flutterwave API, return payment link
  res.json({ paymentLink: null, txRef: null });
});

// Flutterwave webhook — MUST be public (no auth)
router.post('/webhook', async (req, res) => {
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
  const signature = req.headers['verif-hash'];
  if (!signature || signature !== secretHash) {
    return res.status(401).send('Unauthorised');
  }
  // TODO: verify transaction, upgrade user subscription
  res.sendStatus(200);
});

module.exports = router;
