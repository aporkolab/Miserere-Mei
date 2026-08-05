const userColumns = DataTypes => ({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = {
  async up({ context: queryInterface }) {
    const { DataTypes } = require('sequelize');
    const tables = (await queryInterface.showAllTables()).map(table => String(table).toLowerCase());
    if (!tables.includes('user')) await queryInterface.createTable('User', userColumns(DataTypes));
    if (!tables.includes('places'))
      await queryInterface.createTable('Places', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        location: { type: DataTypes.STRING, allowNull: false },
        narrationZoneText: { type: DataTypes.TEXT, allowNull: false },
        opponentName: DataTypes.STRING,
        opponenthealth: DataTypes.INTEGER,
        opponentMinDamage: DataTypes.INTEGER,
        opponentMaxDamage: DataTypes.INTEGER,
        decision1: { type: DataTypes.STRING, allowNull: false },
        decision2: DataTypes.STRING,
        decision3: DataTypes.STRING,
        decision4: DataTypes.STRING,
        furtherLocation1: { type: DataTypes.STRING, allowNull: false },
        furtherLocation2: DataTypes.STRING,
        furtherLocation3: DataTypes.STRING,
        furtherLocation4: DataTypes.STRING,
        objectFound: DataTypes.STRING,
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      });
    if (!tables.includes('players'))
      await queryInterface.createTable('Players', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        protagonistHealthPoint: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 },
        playerAmmo: { type: DataTypes.INTEGER, defaultValue: 15 },
        currentWeaponName: { type: DataTypes.STRING, allowNull: false },
        currentWeaponMinDamage: { type: DataTypes.INTEGER, allowNull: false },
        currentWeaponMaxDamage: { type: DataTypes.INTEGER, allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      });
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('Players');
    await queryInterface.dropTable('Places');
    await queryInterface.dropTable('User');
  },
};
