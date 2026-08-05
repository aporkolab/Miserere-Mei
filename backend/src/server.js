const express = require('express');
const logger = require('./logger/logger');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const client = require('prom-client');
const Sentry = require('@sentry/node');
const { sequelize } = require('./models');

const app = express();
if (process.env.SENTRY_DSN)
  Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.NODE_ENV });
const register = new client.Registry();
client.collectDefaultMetrics({ register });
const requestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

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
app.use(cookieParser());
app.use((req, res, next) => {
  const end = requestDuration.startTimer();
  res.once('finish', () =>
    end({ method: req.method, route: req.route?.path || req.path, status: res.statusCode })
  );
  next();
});
app.use((req, res, next) => {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) || !req.cookies.miserere_session)
    return next();
  const origin = req.get('origin');
  const allowed = allowedOrigins.length ? allowedOrigins : [`${req.protocol}://${req.get('host')}`];
  if (origin && !allowed.includes(origin))
    return res.status(403).json({ hasError: true, message: 'Invalid request origin' });
  return next();
});

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
app.get('/ready', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    return res.json({ status: 'ready' });
  } catch (error) {
    return next(Object.assign(error, { status: 503 }));
  }
});
app.get('/metrics', async (req, res) => {
  res.type(register.contentType);
  res.send(await register.metrics());
});

// Alapértelmezett útvonal a teszteléshez
app.get('/', (req, res) => {
  const indexFile = path.resolve(process.env.FRONTEND_DIR || 'public', 'index.html');
  // The deployment path is administrator-controlled, never request-controlled.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (fs.existsSync(indexFile)) return res.sendFile(indexFile);
  return res.send('Miserere Mei backend is working.');
});

const frontendDir = path.resolve(process.env.FRONTEND_DIR || 'public');
// eslint-disable-next-line security/detect-non-literal-fs-filename
if (fs.existsSync(frontendDir)) {
  app.use(express.static(frontendDir, { index: false, maxAge: '1y', immutable: true }));
  app.get('*path', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    return res.sendFile(path.join(frontendDir, 'index.html'));
  });
}

app.use((req, res) => res.status(404).json({ hasError: true, message: 'Not found' }));

// Hibakezelés
app.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) {
    logger.error(err.stack || err.message);
    if (process.env.SENTRY_DSN) Sentry.captureException(err);
  }
  res.status(status);
  res.json({
    hasError: true,
    message: status >= 500 ? 'Internal server error' : err.message,
  });
});

module.exports = app;
