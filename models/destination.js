'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "Wishlists",
        foreignKey: "destinationId",
      });
    }
  }
  Destination.init(
    {
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      day: DataTypes.STRING,
      languange: DataTypes.STRING,
      typeTour: DataTypes.STRING,
      departure: DataTypes.DATE,
      overview: DataTypes.TEXT,
      include: DataTypes.STRING,
      exclude: DataTypes.STRING,
      image: DataTypes.TEXT,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Destination",
    }
  );
  return Destination;
};