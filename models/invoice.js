'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User)
        }
    }
    Invoice.init({
        itemName: DataTypes.STRING,
        price: DataTypes.INTEGER,
        size: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: { msg: 'Please select your Kicks size' },
                notNull: { msg: 'Please select your Kicks size' },
            }
        },
        quantity: DataTypes.INTEGER,
        invoiceNumber: DataTypes.STRING,
        UserId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Invoice',
    });
    return Invoice;
};