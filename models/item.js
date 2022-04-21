'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User, {
        foreignKey: 'sellerId',
      });
      Item.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
      Item.belongsToMany(models.User, {
        through: models.Transaction,
        foreignKey: 'itemId',
      });
      Item.belongsToMany(models.Transaction, {
        through: models.Contributor,
        foreignKey: 'itemId',
      });
    }
  }
  Item.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: { args: false, msg: 'Name is required' },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: { args: false, msg: 'Description is required' },
      },
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );
  return Item;
};
