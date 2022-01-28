'use strict';
require('dotenv').config({ path: process.cwd() + '/.env' })
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pseudo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      photoUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: `${process.env.CLOUD_DEFAULT_ICON_URL}`
      },
      photoId: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: `${process.env.CLOUD_DEFAULT_ICON_ID}`
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};