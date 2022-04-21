"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/wishlist.json");
    await queryInterface.bulkInsert("Wishlists", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Wishlists", null, {});
  },
};
