'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'cascade' });

      models.Like.belongsTo(models.Publication, { foreignKey: 'publicationId', onDelete: 'cascade' });
    }
  };
  Like.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    publicationId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: false
  });
  return Like;
};