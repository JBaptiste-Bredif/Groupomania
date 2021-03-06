'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Publication);
      models.User.hasMany(models.Comment);
      models.User.hasMany(models.Like);
    }
  };
  User.init({
    pseudo: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      default: `defaultAvatar.png`
    },
    photoId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'User',
    indexes: [{ unique: true, fields: ["email"] }],
    timestamps: true
  });
  return User;
};