// id / id user / title / description / img / nbr like ?
module.exports = (database, Sequelize) => {
  const Publication = database.define("publication", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
    // classMethods: {
    //   associate: function (models) {
    //     // associations can be defined here
    //     Publication.belongsTo(models.user, {
    //       foreignKey: 'user_id',
    //       onDelete: 'cascade'

    //     })
    //   }
    // }
  });

  Publication.associate = function (models) {
    Publication.belongsTo(models.user, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  }
  return Publication;
};