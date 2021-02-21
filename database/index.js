const { Sequelize } = require('sequelize');
const { username, password } = require('./mysqlLoginInfo.js');

const orm = new Sequelize('sdgar', username, password, { dialect: 'mysql' });

const Records = orm.define('records', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tradingSymbol: {
    type: Sequelize.STRING,
  },
  filings: {
    type: Sequelize.STRING,
  },
  fileDate: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  htmlUrl: {
    type: Sequelize.STRING,
  },
});

Records.sync();

module.exports.Records = Records;
module.exports.orm = orm;
