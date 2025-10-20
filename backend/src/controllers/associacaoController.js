const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');

module.exports = {
  async associar(req, res) {
    try {
      const { produtoId, fornecedorId } = req.body;
      if (!produtoId || !fornecedorId) {
        return res.status(400).json({ error: 'Campos obrigatórios: produtoId, fornecedorId' });
      }
      const produto = await Produto.findByPk(produtoId);
      const fornecedor = await Fornecedor.findByPk(fornecedorId);
      if (!produto || !fornecedor) {
        return res.status(404).json({ error: 'Produto ou fornecedor não encontrado' });
      }
      await produto.addFornecedor(fornecedor);
      const fornecedores = await produto.getFornecedors();
      return res.json({ message: 'Associação criada com sucesso', fornecedores });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao associar produto e fornecedor' });
    }
  },

  async listarPorFornecedor(req, res) {
    try {
      const { fornecedorId } = req.params;
      const fornecedor = await Fornecedor.findByPk(fornecedorId);
      if (!fornecedor) return res.status(404).json({ error: 'Fornecedor não encontrado' });
      const produtos = await fornecedor.getProdutos({ order: [['id', 'ASC']] });
      return res.json(produtos);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar produtos do fornecedor' });
    }
  },
};
