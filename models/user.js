"use strict";
const { Model } = require("sequelize");
const { createHash } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Bookmark);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email Cannot Be Empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password Cannot Be Empty",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, option) => {
          user.password = createHash(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
