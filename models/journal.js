'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.journal.belongsTo(models.user)
    }
    getJournal() {
      return this.subject + this.quote + this.entry + this.userId
    }
  };
  journal.init({
    subject: DataTypes.STRING,
    quote: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    entry: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'journal',
  });
  return journal;
};