const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({ tracks: [], albums: [], artists: [] });
  // TODO: Supabase full-text search
  res.json({ tracks: [], albums: [], artists: [] });
});

module.exports = router;
