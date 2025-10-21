const Produto = require('../models/Produto');

module.exports = {
  async listar(req, res) {
    try {
      const produtos = await Produto.findAll();
      return res.json(produtos);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      return res.status(500).json({ error: 'Erro ao listar produtos' });
    }
  },

  async criar(req, res) {
    try {
      const produto = await Produto.create(req.body);
      return res.status(201).json(produto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({ error: 'Erro ao criar produto' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      await Produto.update(req.body, { where: { id } });
      const produtoAtualizado = await Produto.findByPk(id);
      return res.json(produtoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await Produto.destroy({ where: { id } });
      return res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  },
};
