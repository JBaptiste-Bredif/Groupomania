'use strict';
require("dotenv").config();
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};
// Renvoyer les informations pour le front sur les controllers (cela évite de faire de la magie noir en vue js)
const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DB, process.env.DB_LOGIN, process.env.DB_PWD, {
  host: process.env.HOST,
  dialect: 'mysql'
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    if (file !== 'index') {
      let model = require(path.join(__dirname, file))(database, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.database = database;

module.exports = db;