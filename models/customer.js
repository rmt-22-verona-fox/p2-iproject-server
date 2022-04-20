"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.History, { foreignKey: "CustomerId" });
      this.hasMany(models.Order, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      hands: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
