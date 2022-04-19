"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title is required" },
          notEmpty: { msg: "Title is required" },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Synopsis is required" },
          notEmpty: { msg: "Synopsis is required" },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "ImageUrl is required" },
          notEmpty: { msg: "ImageUrl is required" },
        },
      },
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "VideoUrl is required" },
          notEmpty: { msg: "VideoUrl is required" },
        },
      },
      releasedYear: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "ReleasedYear is required" },
          notEmpty: { msg: "ReleasedYear is required" },
        },
      },
      totalWatchlist: DataTypes.INTEGER,
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "CategoryId is required" },
          notEmpty: { msg: "CategoryId is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
