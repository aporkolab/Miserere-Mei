require('dotenv').config();
const logger = require('./logger/logger');
const app = require('./server');
const { sequelize } = require('./models');
const port = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(port, () => {
    logger.info(`App listening at http://localhost:${port}`);
  });
}

start().catch(error => {
  logger.error(error.stack || error.message);
  process.exit(1);
});
