const { Sequelize } = require('sequelize');
const path = require('path');

// Caminho para o arquivo SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../data/database.sqlite'),
  logging: false
});

module.exports = sequelize;
