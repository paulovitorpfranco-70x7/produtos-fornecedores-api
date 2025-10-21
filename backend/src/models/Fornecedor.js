const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Fornecedor = sequelize.define('Fornecedor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Fornecedores',
  timestamps: true,
});

module.exports = Fornecedor;
