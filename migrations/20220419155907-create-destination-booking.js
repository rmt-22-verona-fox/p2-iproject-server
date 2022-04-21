"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("destinationBookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      destinationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Destinations",
          },
          id: "id",
        },
      },
      bookingId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Bookings",
          },
          id: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("destinationBookings");
  },
};
