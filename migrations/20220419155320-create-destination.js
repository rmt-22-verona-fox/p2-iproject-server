"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Destinations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      country: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      day: {
        type: Sequelize.STRING,
      },
      languange: {
        type: Sequelize.STRING,
      },
      typeTour: {
        type: Sequelize.STRING,
      },
      departure: {
        type: Sequelize.DATE,
      },
      overview: {
        type: Sequelize.TEXT,
      },
      include: {
        type: Sequelize.STRING,
      },
      exclude: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Destinations");
  },
};
