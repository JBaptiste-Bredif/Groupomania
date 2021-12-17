const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.DB, process.env.DB_LOGIN, process.env.DB_PWD, {
  host: process.env.HOST,
  dialect: 'mysql'
})

const db = {};

db.Sequelize = Sequelize;
db.database = database;

db.user = require("./model-user.js")(database, Sequelize);

module.exports = db;