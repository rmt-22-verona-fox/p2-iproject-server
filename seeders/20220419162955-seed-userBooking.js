"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user_booking.json");
    await queryInterface.bulkInsert("userBookings", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("userBookings", null, {});
  },
};
