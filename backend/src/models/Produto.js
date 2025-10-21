const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  codigoBarras: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Produtos', // garante que o nome da tabela é Produtos
  timestamps: true
});

module.exports = Produto;
