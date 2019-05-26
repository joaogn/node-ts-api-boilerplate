'use strict';

//This code was created by sequelize init, it is responsible for configuring and starting the sequelize and its database.
//This file is originally a .js file that was renamed for .ts


const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/env/config')();
const env = config.env || 'development';

 const db:any = {};   //original is const db = {}; Changed to go through TypeScript types

let sequelize;
if (config.dbURL) {
  sequelize = new Sequelize(config.dbURL);
} else {
  sequelize = new Sequelize(config.db, config.username, config.password);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
