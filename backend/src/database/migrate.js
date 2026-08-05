const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('../models');
const logger = require('../logger/logger');

const migrator = new Umzug({
  migrations: { glob: path.join(__dirname, 'migrations/*.js') },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger,
});

module.exports = async () => migrator.up();
