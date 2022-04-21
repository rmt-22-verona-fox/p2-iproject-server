"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/destination.json");
    await queryInterface.bulkInsert("Destinations", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Destinations", null, {});
  },
};
