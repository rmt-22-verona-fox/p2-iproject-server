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
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      phoenNumber: DataTypes.INTEGER,
      address: DataTypes.STRING,
      bio: DataTypes.TEXT,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile_Male",
    }
  );
  return Profile_Male;
};
