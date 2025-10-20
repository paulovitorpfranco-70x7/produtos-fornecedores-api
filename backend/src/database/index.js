const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const storagePath = process.env.SQLITE_STORAGE || './data/database.sqlite';
const fullPath = path.resolve(__dirname, '../../', storagePath);

// Garante que a pasta "data" exista
const dir = path.dirname(fullPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Cria a conexão com o SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: fullPath,
  logging: false,
});

module.exports = sequelize;
