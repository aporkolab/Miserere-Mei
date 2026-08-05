const { Sequelize, DataTypes } = require('sequelize');

const path = require('path');

const dialect = process.env.DB_DIALECT || 'mysql';
const sequelize =
  dialect === 'sqlite'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE || path.resolve(process.cwd(), 'data/miserere.sqlite'),
        logging: false,
      })
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        dialect: 'mysql',
        logging: false,
      });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Place = require('./place')(sequelize, DataTypes);
db.Player = require('./player')(sequelize, DataTypes);

module.exports = db;
