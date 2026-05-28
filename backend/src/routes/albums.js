const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => res.json({ data: [], pagination: { page: 1, limit: 20, total: 0 } }));
router.get('/:id', async (req, res) => res.json({ data: null }));

module.exports = router;
