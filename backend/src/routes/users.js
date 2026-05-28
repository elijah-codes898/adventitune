const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

router.get('/me', requireAuth, (req, res) => res.json({ data: req.user }));
router.patch('/me', requireAuth, async (req, res) => res.json({ data: req.user }));

module.exports = router;
