const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.DB_LOGIN, process.env.DB_PWD, {
  host: process.env.HOST,
  dialect: 'mysql'
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./model-user.js")(sequelize, Sequelize);

module.exports = db;