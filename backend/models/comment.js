'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'cascade' });

      models.Comment.belongsTo(models.Publication, { foreignKey: 'publicationId', onDelete: 'cascade' });
    }
  };
  Comment.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    publicationId: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};