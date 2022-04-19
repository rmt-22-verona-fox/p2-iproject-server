'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class destinationBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  destinationBooking.init({
    destinationId: DataTypes.INTEGER,
    bookingId: DataTypes.INTEGER,
    child: DataTypes.NUMBER,
    adult: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'destinationBooking',
  });
  return destinationBooking;
};