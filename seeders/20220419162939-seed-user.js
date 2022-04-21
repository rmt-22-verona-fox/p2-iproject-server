"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user.json");
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
