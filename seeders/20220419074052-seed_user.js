'use strict';
const bcrypt = require('bcryptjs');
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
        var salt = bcrypt.genSaltSync(10);
        const user = [{
            email: 'test@email.com',
            password: bcrypt.hashSync("user1", salt),
            createdAt: new Date(),
            updatedAt: new Date()
        }]
        await queryInterface.bulkInsert('Users', user)
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    }
};