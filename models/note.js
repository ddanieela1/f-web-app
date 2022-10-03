'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.note.belongsTo(models.user)
    }
  }
  note.init({
    userId: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'note',
  });
  return note;
};