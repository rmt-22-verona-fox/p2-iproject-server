'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userBookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          id: "id"
        }
      },
      bookingId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Bookings",
          },
          id: "id"
        }
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
    await queryInterface.dropTable('userBookings');
  }
};