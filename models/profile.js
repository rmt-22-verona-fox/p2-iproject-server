"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Name is required" },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Gender is required" },
        },
      },
      age: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Age is required" },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "PhoneNumber is required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Address is required" },
        },
      },
      photoProfile: {
        type: DataTypes.STRING,
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
