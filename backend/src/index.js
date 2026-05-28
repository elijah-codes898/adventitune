require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: '*' })); // Tighten in production
app.use(morgan('dev'));
app.use(express.json());

// Rate limiting
app.use('/v1/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));
app.use('/v1/payments', rateLimit({ windowMs: 60 * 1000, max: 10 }));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/v1/tracks', require('./routes/tracks'));
app.use('/v1/albums', require('./routes/albums'));
app.use('/v1/search', require('./routes/search'));
app.use('/v1/users', require('./routes/users'));
app.use('/v1/payments', require('./routes/payments'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: '0.1.0', service: 'adventitune-api' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🎵 AdventiTune API running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
