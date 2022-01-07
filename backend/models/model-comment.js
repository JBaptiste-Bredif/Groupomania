// id / id user / string com / les dates ( voir si utiles ) / id du post*
module.exports = (database, Sequelize) => {
  const Comment = database.define("comment", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    publication_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
  })

  Comment.associate = function (models) {
    Comment.belongsTo(models.publication, {
      foreignKey: 'publication_id',
      onDelete: 'CASCADE'
    })

    Comment.belongsTo(models.user, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  }
  return Comment
}