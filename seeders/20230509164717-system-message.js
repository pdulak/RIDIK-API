'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Messages', [{
      question: 'SYSTEM',
      answer: 'You are a helpful assistant.',
      system: true,
      uuid: 'SYSTEM',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
