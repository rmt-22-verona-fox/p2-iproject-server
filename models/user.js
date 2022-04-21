'use strict';
const { Model } = require('sequelize');
const { passwordEncryptor } = require('../helpers/helperBcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Item, {
        through: models.Transaction,
        foreignKey: 'userId',
      });
      User.belongsToMany(models.Transaction, {
        through: models.Contributor,
        foreignKey: 'userId',
      });
      // Probable source of error
      // ---------------------------
      User.hasMany(models.Item, {
        foreignKey: 'sellerId',
      });
      // ---------------------------
      User.belongsToMany(models.Category, {
        through: models.Item,
        foreignKey: 'sellerId',
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: 'Email cannot be null' },
        validate: {
          isEmail: {
            args: true,
            msg: 'Email must be a valid email address',
          },
          notEmpty: {
            args: true,
            msg: 'email must not empty',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: 'Password cannot be null' },
      },
      username: DataTypes.STRING,
      role: DataTypes.STRING,
      isSeller: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  //!
  User.beforeCreate((instance, option) => {
    instance.password = passwordEncryptor(instance.password);
  });

  return User;
};
