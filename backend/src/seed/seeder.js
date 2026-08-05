const fs = require('fs').promises;
const path = require('path');
const { sequelize, User, Place, Player } = require('../models');
const bcrypt = require('bcrypt');
const logger = require('../logger/logger');

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const seedDatabase = async ({ force = false } = {}) => {
  try {
    if (force) await sequelize.sync({ force: true });
    const hasStoryData = (await Place.count()) > 0;
    const hasUsers = (await User.count()) > 0;

    const placesPath = path.resolve(__dirname, '../seed/places.json');
    const playersPath = path.resolve(__dirname, '../seed/player.json');

    const places = JSON.parse(await fs.readFile(placesPath, 'utf8'));
    const players = JSON.parse(await fs.readFile(playersPath, 'utf8'));
    let users = [];
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      users = [
        {
          firstName: process.env.ADMIN_FIRST_NAME || 'Admin',
          lastName: process.env.ADMIN_LAST_NAME || 'User',
          email: process.env.ADMIN_EMAIL.trim().toLowerCase(),
          role: 3,
          password: process.env.ADMIN_PASSWORD,
        },
      ];
    }

    const placeChunks = chunkArray(places, 1000);
    const playerChunks = chunkArray(players, 1000);
    const userChunks = chunkArray(users, 1000);

    if (!hasStoryData) {
      for (const chunk of placeChunks) await Place.bulkCreate(chunk);
      for (const chunk of playerChunks) await Player.bulkCreate(chunk);
    }

    if (!hasUsers) {
      for (const chunk of userChunks) {
        for (const user of chunk) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
        await User.bulkCreate(chunk);
      }
    }

    if (!hasUsers && !users.length)
      logger.warn('No admin created; set ADMIN_EMAIL and ADMIN_PASSWORD.');

    logger.info('Database has been seeded successfully.');
  } catch (error) {
    logger.error(error.stack || error.message);
    throw error;
  }
};

module.exports = seedDatabase;
