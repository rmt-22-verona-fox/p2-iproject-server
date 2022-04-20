'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Kain Jacquard',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kain Sutra',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kain Poly TC',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kain Katun Panca',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kain Katun Catra',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
