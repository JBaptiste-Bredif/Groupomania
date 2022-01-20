'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      publicationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        references: {
          model: 'Publications',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Likes');
  }
};