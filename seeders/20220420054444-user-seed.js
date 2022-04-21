'use strict';

const { passwordEncryptor } = require('../helpers/helperBcrypt');

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
          password: passwordEncryptor('adminadmin11'),
          username: 'Asep Chidori',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'admin',
          isSeller: true,
        },
        {
          email: 'ucok@mail.com',
          password: passwordEncryptor('selerseler22'),
          username: 'Ucok Rasengan',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'member',
          isSeller: true,
        },
        {
          email: 'jamal@mail.com',
          password: passwordEncryptor('userbiasa33'),
          username: 'Jamal Kuchiyose',
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'member',
          isSeller: false,
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
