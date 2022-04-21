"use strict";
const { Model } = require("sequelize");
const { hashed } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      symptomps: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          var hash = hashed(instance.password);
          instance.password = hash;
        },
      },
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
