"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn(
      "Profile_Females",
      "phoenNumber",
      "phoneNumber"
    );
    await queryInterface.renameColumn(
      "Profile_Males",
      "phoenNumber",
      "phoneNumber"
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn(
      "Profile_Females",
      "phoneNumber",

      "phoenNumber"
    );
    await queryInterface.renameColumn(
      "Profile_Males",
      "phoneNumber",

      "phoenNumber"
    );
  },
};
