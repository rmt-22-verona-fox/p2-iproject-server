"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile_Male extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsToMany(models.Profile_Female, { through: models.Partner });
    }
  }
  Profile_Male.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Plese input name" },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Plese input age" },
        },
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "Plese input phone number" },
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Plese input address" },
        },
      },
      bio: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: { msg: "Plese input bio" },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile_Male",
    }
  );
  return Profile_Male;
};
