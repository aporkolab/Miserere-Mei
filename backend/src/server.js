const express = require('express');
const logger = require('./logger/logger');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./models');

const app = express();

// Cross Origin Resource Sharing (CORS) beállítás
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1);
app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.error(`CORS error: Origin ${origin} not allowed`);
        callback(Object.assign(new Error('Not allowed by CORS'), { status: 403 }));
      }
    },
  })
);

// Loggolás
app.use(
  morgan('combined', {
    stream: logger.stream,
  })
);

// Statikus fájlok kezelése
app.use(express.static('public'));

// JSON kérések feldolgozása
app.use(express.json({ limit: '100kb' }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again later.' },
});

// Autentikációs middleware
const authenticateJwt = require('./models/auth/authenticate');

// Route-ok beállítása
app.use('/allplace', authenticateJwt, require('./controllers/allplace/router'));
app.use('/place', require('./controllers/place/router'));
app.use('/player', require('./controllers/player/router'));
app.use('/users', authenticateJwt, require('./controllers/user/router'));
app.use('/login', loginLimiter, require('./controllers/login/router'));

app.get('/health', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    return res.json({ status: 'ok' });
  } catch (error) {
    return next(Object.assign(error, { status: 503 }));
  }
});

// Alapértelmezett útvonal a teszteléshez
app.get('/', (req, res) => {
  res.send('Miserere Mei backend is working.');
});

app.use((req, res) => res.status(404).json({ hasError: true, message: 'Not found' }));

// Hibakezelés
app.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) {
    logger.error(err.stack || err.message);
  }
  res.status(status);
  res.json({
    hasError: true,
    message: status >= 500 ? 'Internal server error' : err.message,
  });
});

module.exports = app;
