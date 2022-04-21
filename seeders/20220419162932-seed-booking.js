"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/booking.json");
    await queryInterface.bulkInsert("Bookings", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
