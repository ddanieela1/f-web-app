'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journal extends Model {
    static associate(models) {
      models.journal.belongsTo(models.user)
    }
    getJournal() {
      return this.subject
    }
  };
  journal.init({
    subject: DataTypes.STRING,
    quote: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    entry: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'journal',
  });
  return journal;
};