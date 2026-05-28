const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

/**
 * GET /v1/tracks
 * List tracks with pagination and optional filters
 */
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, genre, language } = req.query;
    const offset = (page - 1) * limit;

    // TODO: replace with real Supabase query
    // const { data, error, count } = await supabase
    //   .from('tracks')
    //   .select('*, artists(name), albums(title, cover_image_url)', { count: 'exact' })
    //   .range(offset, offset + limit - 1)
    //   .order('created_at', { ascending: false });

    // Mock response for now
    res.json({
      data: [],
      pagination: { page: Number(page), limit: Number(limit), total: 0 },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /v1/tracks/:id
 * Get a single track with full details
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: Supabase lookup
    res.json({ data: null });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /v1/tracks/:id/stream
 * Returns a short-lived signed URL to stream audio from Cloudflare R2
 * Requires: authenticated user
 */
router.get('/:id/stream', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;

    // TODO: Generate signed R2 URL
    // const command = new GetObjectCommand({ Bucket: R2_BUCKET, Key: `tracks/${id}.mp3` });
    // const url = await getSignedUrl(s3Client, command, { expiresIn: 900 }); // 15 min

    res.json({ streamUrl: null, expiresIn: 900 });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /v1/tracks/:id/download
 * Returns a signed download URL — Premium users only
 * Requires: authenticated user with active premium subscription
 */
router.get('/:id/download', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (user.subscription_tier !== 'premium') {
      return res.status(403).json({ error: 'Premium subscription required to download tracks' });
    }

    // TODO: Generate signed R2 download URL
    res.json({ downloadUrl: null, expiresIn: 3600 });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
