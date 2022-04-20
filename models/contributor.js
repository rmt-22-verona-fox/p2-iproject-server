'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contributor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contributor.belongsTo(models.Transactions, {
        foreignKey: 'transId',
      });
      Contributor.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Contributor.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      transId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      contribution: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Contributor',
    }
  );
  return Contributor;
};
