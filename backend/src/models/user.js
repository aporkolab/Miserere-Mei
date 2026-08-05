const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true, len: [3, 254] },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [8, 255] },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 100] },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 100] },
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isIn: [[1, 2, 3]] },
      },
    },
    {
      tableName: 'User',
      freezeTableName: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
      hooks: {
        beforeCreate: async user => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async user => {
          if (user.password && user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
      timestamps: false,
    }
  );

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
