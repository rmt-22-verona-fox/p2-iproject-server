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
      'Users',
      [
        {
          email: 'asep@mail.com',
          password: 'adminadmin11',
          username: 'Asep Chidori',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'admin',
          seller: true,
        },
        {
          email: 'ucok@mail.com',
          password: 'selerseler22',
          username: 'Ucok Rasengan',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'member',
          seller: true,
        },
        {
          email: 'jamal@mail.com',
          password: 'userbiasa33',
          username: 'Jamal Kuchiyose',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'member',
          seller: false,
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
    await queryInterface.bulkDelete('Users', null, {});
  },
};
