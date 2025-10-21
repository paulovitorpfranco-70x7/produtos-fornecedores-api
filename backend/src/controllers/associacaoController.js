const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');

module.exports = {
  // POST /associar { produtoId, fornecedorId }
  async associar(req, res) {
    try {
      let { produtoId, fornecedorId } = req.body;
      if (!produtoId || !fornecedorId) {
        return res.status(400).json({ error: 'Campos obrigatórios: produtoId e fornecedorId' });
      }
      // garante número
      produtoId = Number(produtoId);
      fornecedorId = Number(fornecedorId);

      const produto = await Produto.findByPk(produtoId);
      const fornecedor = await Fornecedor.findByPk(fornecedorId);

      if (!produto || !fornecedor) {
        return res.status(404).json({ error: 'Produto ou Fornecedor não encontrado' });
      }

      await produto.addFornecedor(fornecedor);

      // retorno da associação atualizada
      const fornecedores = await produto.getFornecedors(); // nome que o Sequelize gera
      return res.status(201).json({ message: 'Associação criada com sucesso', fornecedores });
    } catch (err) {
      console.error('Erro ao associar:', err);
      return res.status(500).json({ error: 'Erro ao associar produto e fornecedor' });
    }
  },

  // GET /fornecedores/:fornecedorId/produtos
  async listarPorFornecedor(req, res) {
    try {
      const fornecedorId = Number(req.params.fornecedorId);
      const fornecedor = await Fornecedor.findByPk(fornecedorId);
      if (!fornecedor) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }
      const produtos = await fornecedor.getProdutos({ order: [['id', 'ASC']] });
      return res.json(produtos);
    } catch (err) {
      console.error('Erro ao listar produtos do fornecedor:', err);
      return res.status(500).json({ error: 'Erro ao listar produtos do fornecedor' });
    }
  },
};
