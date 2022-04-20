'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/helperBcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.MyApplication)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: { msg: 'Email must be unique' },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        },
        isLengthMinimumEight(value) {
          if (value.length < 8 && value.length > 0) {
            throw new Error("Password length minimum are 8 characters");
          }
        },
      }
    },
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};