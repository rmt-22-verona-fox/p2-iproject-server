'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "userBookings",
        foreignKey: "bookingId",
      });
    }
  }
  Booking.init(
    {
      bookingNumber: DataTypes.INTEGER,
      paymentMethod: DataTypes.STRING,
      bookingStatus: DataTypes.STRING,
      child: DataTypes.INTEGER,
      adult: DataTypes.INTEGER,
      infant: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      addressLine: DataTypes.STRING,
      city: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      specialRequirement: DataTypes.TEXT,
      discount: DataTypes.INTEGER,
      totalPayment: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.bookingNumber =
            Math.floor(Math.random() * (900 - 100 + 1)) + 100;
          instance.bookingStatus = "Pending";
        },
      },
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};