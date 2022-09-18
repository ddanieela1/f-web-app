module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'journals',
      'userId',
     Sequelize.INTEGER
    );
    await queryInterface.removeColumn(
      'journals',
      'date',
     Sequelize.STRING
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'journals',
      'userId',
    );
  }
};
