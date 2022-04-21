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
      'Items',
      [
        {
          name: 'Kain Jacquard',
          description:
            'Kain Jacquard atau lebih dikenal oleh masyarakat luas dengan nama king koil merupakan jenis bahan sprei yang bersifat lembut dan dingin.',
          quantity: 50,
          price: 563000,
          categoryId: 1,
          sellerId: 2,
          status: 'available',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kain Sutra',
          description:
            'Jenis kain ini diperoleh dari kombinasi antara katun dan sutra sehingga memiliki sifat yang lemas dan bertekstur licin layaknya kain sutra.',
          quantity: 50,
          price: 570000,
          categoryId: 1,
          sellerId: 2,
          status: 'available',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kain Katun Panca',
          description:
            'Seperti halnya kain katun catra, kain panca juga tersusun atas campuran katun dan polyester.',
          quantity: 50,
          price: 565000,
          categoryId: 1,
          sellerId: 2,
          status: 'available',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Kain Katun Catra',
          description:
            'Kain katun catra merupakan jenis bahan sprei yang tersusun atas campuran katun dan polyester, dengan perbandingan 80% material katun dan 20% material polyester.',
          quantity: 50,
          price: 562000,
          categoryId: 1,
          sellerId: 2,
          status: 'available',
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
    await queryInterface.bulkDelete('Items', null, {});
  },
};
