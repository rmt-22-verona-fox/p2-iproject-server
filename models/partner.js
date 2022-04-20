"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Profile);
      this.belongsTo(models.User);
    }
  }
  Partner.init(
    {
      ProfileId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Partner",
    }
  );
  Partner.beforeCreate((instance, options) => {
    instance.status = "pending";
  });
  return Partner;
};
