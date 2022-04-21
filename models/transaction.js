'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Item, {
        foreignKey: 'itemId',
      });
      Transaction.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Transaction.belongsToMany(models.User, {
        through: models.Contributor,
        foreignKey: 'userId',
      });
    }
  }
  Transaction.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      buyAmount: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      paid: DataTypes.INTEGER,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
