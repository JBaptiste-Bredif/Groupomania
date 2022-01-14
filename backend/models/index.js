'use strict';
require("dotenv").config();
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

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
    const model = require(path.join(__dirname, file))(database, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.user = require("./user.js")(database, Sequelize);
db.publication = require("./publication.js")(database, Sequelize);
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.database = database;

// db.like = require("./like.js")(database, Sequelize);
// db.comment = require("./comment.js")(database, Sequelize);

module.exports = db;