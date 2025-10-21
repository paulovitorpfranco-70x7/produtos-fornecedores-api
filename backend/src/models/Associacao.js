const Produto = require('./Produto');
const Fornecedor = require('./Fornecedor');

// Tabela de junção: FornecedorProdutos
Produto.belongsToMany(Fornecedor, {
  through: 'FornecedorProdutos',
  foreignKey: 'produtoId',
});

Fornecedor.belongsToMany(Produto, {
  through: 'FornecedorProdutos',
  foreignKey: 'fornecedorId',
});

module.exports = { Produto, Fornecedor };
