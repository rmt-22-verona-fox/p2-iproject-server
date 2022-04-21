'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userBooking extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Booking, { foreignKey: "bookingId" });
    }
  }
  userBooking.init(
    {
      userId: DataTypes.INTEGER,
      bookingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userBooking",
    }
  );
  return userBooking;
};