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
    // Synchronize all models
    await sequelize.sync({ force });
    logger.info('All tables have been created or updated.');

    const placesPath = path.resolve(__dirname, '../seed/places.json');
    const playersPath = path.resolve(__dirname, '../seed/player.json');
    const usersPath = path.resolve(__dirname, '../seed/users.json');

    const places = JSON.parse(await fs.readFile(placesPath, 'utf8'));
    const players = JSON.parse(await fs.readFile(playersPath, 'utf8'));
    const users = JSON.parse(await fs.readFile(usersPath, 'utf8'));

    const placeChunks = chunkArray(places, 1000);
    const playerChunks = chunkArray(players, 1000);
    const userChunks = chunkArray(users, 1000);

    for (const chunk of placeChunks) {
      await Place.bulkCreate(chunk);
    }

    for (const chunk of playerChunks) {
      await Player.bulkCreate(chunk);
    }

    for (const chunk of userChunks) {
      for (const user of chunk) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
      await User.bulkCreate(chunk);
    }

    logger.info('Database has been seeded successfully.');
  } catch (error) {
    logger.error(error.stack || error.message);
    throw error;
  }
};

module.exports = seedDatabase;
