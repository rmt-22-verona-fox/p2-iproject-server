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
      email: DataTypes.STRING,
      password: DataTypes.STRING,
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
