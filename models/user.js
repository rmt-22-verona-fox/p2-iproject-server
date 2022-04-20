'use strict';
const { user } = require('pg/lib/defaults');
const { Model } = require('sequelize');
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
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
