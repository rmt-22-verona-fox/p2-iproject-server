"use strict";
const axios = require("axios");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  MyPokemon.init(
    {
      UserId: DataTypes.INTEGER,
      PokemonId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MyPokemon",
    }
  );
  return MyPokemon;
};
