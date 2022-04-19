"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile_Female extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsToMany(models.Profile_Male, { through: models.Partner });
    }
  }
  Profile_Female.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      phoneNumber: DataTypes.INTEGER,
      address: DataTypes.STRING,
      bio: DataTypes.TEXT,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile_Female",
    }
  );
  return Profile_Female;
};
