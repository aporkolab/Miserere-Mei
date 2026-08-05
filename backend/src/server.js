const express = require('express');
const logger = require('./logger/logger');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Cross Origin Resource Sharing (CORS) beállítás
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(origin => origin.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.error(`CORS error: Origin ${origin} not allowed`);
        callback(new Error('Not allowed by CORS'));
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
app.use(express.json());

// Autentikációs middleware
const authenticateJwt = require('./models/auth/authenticate');

// Route-ok beállítása
app.use('/allplace', authenticateJwt, require('./controllers/allplace/router'));
app.use('/place', require('./controllers/place/router'));
app.use('/player', require('./controllers/player/router'));
app.use('/users', authenticateJwt, require('./controllers/user/router'));
app.use('/login', require('./controllers/login/router'));

// Alapértelmezett útvonal a teszteléshez
app.get('/', (req, res) => {
  res.send('The Miserere Mei v.1.0.0 backend is working!');
});

// Hibakezelés
app.use((err, req, res, next) => {
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
