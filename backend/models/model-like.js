module.exports = (database, Sequelize) => {
  const Like = database.define("like", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    publication_id: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
  })

  Like.associate = function (models) {
    Like.belongsTo(models.publication, {
      foreignKey: 'publication_id',
      onDelete: 'CASCADE'
    })

    Like.belongsTo(models.user, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  }
  return Like
}