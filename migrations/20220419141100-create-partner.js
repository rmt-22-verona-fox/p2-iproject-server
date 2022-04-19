"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Partners", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProfileMaleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Profile_Males",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      ProfileFemaleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Profile_Females",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Partners");
  },
};
