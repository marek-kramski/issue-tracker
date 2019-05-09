const Sequelize = require('sequelize');
const IssueModel = require('./models/issue');
const config = require('../config/config');

const sequelize = new Sequelize(
  config.database.username,
  config.database.databaseName,
  config.database.password, {
    host: config.database.host,
    dialect: 'mysql',
    protocol: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

const Issue = IssueModel(sequelize, Sequelize);


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  Issue
};