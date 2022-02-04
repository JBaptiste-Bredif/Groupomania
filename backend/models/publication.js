'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Publication.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'cascade' });

      models.Publication.hasMany(models.Comment);

      models.Publication.hasMany(models.Like);
    }
  };
  Publication.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    photoUrl: { type: DataTypes.STRING, allowNull: true },
    photoId: { type: DataTypes.STRING, allowNull: true },
    countLikes: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, {
    sequelize,
    modelName: 'Publication',
    timestamps: true
  });
  return Publication;
};