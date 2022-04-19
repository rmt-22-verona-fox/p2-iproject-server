'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Destination.init({
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
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};