require('dotenv').config();
const logger = require('./logger/logger');
const app = require('./server');
const { sequelize } = require('./models');
const port = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  const server = app.listen(port, () => {
    logger.info(`App listening at http://localhost:${port}`);
  });

  const shutdown = signal => {
    logger.info(`${signal} received; shutting down.`);
    server.close(async () => {
      await sequelize.close();
      process.exit(0);
    });
  };

  process.once('SIGTERM', () => shutdown('SIGTERM'));
  process.once('SIGINT', () => shutdown('SIGINT'));
}

start().catch(error => {
  logger.error(error.stack || error.message);
  process.exit(1);
});
