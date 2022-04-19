"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "Profile_Females",
      "photoProfile",
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      "Profile_Males",
      "photoProfile",
      Sequelize.STRING
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      "Profile_Females",
      "photoProfile",
      Sequelize.STRING
    );
    await queryInterface.removeColumn(
      "Profile_Males",
      "photoProfile",
      Sequelize.STRING
    );
  },
};
