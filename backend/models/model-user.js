module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
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
    timestamps: true
  });
  return User;
};