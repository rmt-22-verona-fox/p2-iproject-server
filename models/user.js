"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Booking, {
        through: "userBookings",
        foreignKey: "userId",
      });
      this.belongsToMany(models.Destination, {
        through: "Wishlist",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
