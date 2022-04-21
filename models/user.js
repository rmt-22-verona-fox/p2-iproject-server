'use strict';
const {
    Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/helper-password')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Invoice)
        }
    }
    User.init({
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: 'Email is required' },
                notNull: { msg: 'Email is required' },
                isEmail: { msg: 'Invalid email format' }
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: 'Password is required' },
                notNull: { msg: 'Password is required' },
            }
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: 'Name is required' },
                notNull: { msg: 'Name is required' },
            }
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: 'Address is required' },
                notNull: { msg: 'Address is required' },
            }
        },
        phoneNumber: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: 'Phone Number is required' },
                notNull: { msg: 'Phone Number is required' },
            }
        }
    }, {
        sequelize,
        hooks: {
            beforeCreate: (instance, options) => {
                instance.password = hashingPassword(instance.password)
            },
        },
        modelName: 'User',
    });
    return User;
};