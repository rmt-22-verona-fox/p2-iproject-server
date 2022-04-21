'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Invoices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            itemName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            size: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            invoiceNumber: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            UserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: { tableName: 'Users' },
                    key: 'id'
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Invoices');
    }
};