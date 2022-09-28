'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'journals',
      'favorite',
     Sequelize.BOOLEAN
    );
    await queryInterface.addColumn(
      'journals',
      'photo',
     Sequelize.STRING
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'journals',
      'favorite',
    );
  }
};
