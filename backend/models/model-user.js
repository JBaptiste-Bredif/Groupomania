module.exports = (database, Sequelize) => {
  const User = database.define("user", {
    pseudo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    }
  }, {
    indexes: [{ unique: true, fields: ["email"] }],
    timestamps: true,
    // classMethods: {
    //   associate: function (models) {
    //     // associations can be defined here
    //     User.hasMany(models.post, {
    //       foreignKey: 'user_id',
    //       onDelete: "cascade",
    //     });
    //   }
    // }
  });

  User.associate = function (models) {
    User.hasMany(models.publication, {
      foreignKey: 'user_id',
      as: 'publicationDetails'
    })
  }
  return User;
};