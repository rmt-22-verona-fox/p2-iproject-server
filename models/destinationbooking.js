'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class destinationBooking extends Model {
    static associate(models) {
      this.belongsTo(models.Booking, { foreignKey: "bookingId" });
      this.belongsTo(models.Destination, { foreignKey: "destinationId" });
    }
  }
  destinationBooking.init(
    {
      destinationId: DataTypes.INTEGER,
      bookingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "destinationBooking",
    }
  );
  return destinationBooking;
};