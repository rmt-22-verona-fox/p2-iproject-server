'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hotel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      roomType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hotelClass: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      checkIn: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkOut: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('Tickets');
  }
};