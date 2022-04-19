'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Source extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Source.hasMany(models.MyApplication)
    }
  }
  Source.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Source is required'
        },
        notEmpty: {
          msg: 'Source is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Source',
  });
  return Source;
};