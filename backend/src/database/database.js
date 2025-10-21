const { Sequelize } = require('sequelize');
const path = require('path');

// Caminho para o arquivo do banco SQLite
const storagePath = path.join(__dirname, '../../data/database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: console.log, // Deixe ativado para ver no terminal
});

module.exports = sequelize;
