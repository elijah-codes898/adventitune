// middleware/auth.js
// Verifies Firebase ID token on every protected request

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];

    // TODO: uncomment when Firebase Admin SDK is configured
    // const admin = require('../utils/firebase');
    // const decoded = await admin.auth().verifyIdToken(token);
    // req.user = decoded;

    // Mock user for development
    req.user = { uid: 'mock-uid', email: 'dev@adventitune.app', subscription_tier: 'premium' };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { requireAuth };
