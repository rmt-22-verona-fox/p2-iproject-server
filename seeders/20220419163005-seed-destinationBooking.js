"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/destination_booking.json");
    await queryInterface.bulkInsert("destinationBookings", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("destinationBookings", null, {});
  },
};
