module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("user", {
    login: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    }
  });

  return Tutorial;
};