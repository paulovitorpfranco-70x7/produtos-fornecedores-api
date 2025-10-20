const Produto = require('../models/Produto');

module.exports = {
  async criar(req, res) {
    try {
      const { nome, descricao, preco, codigoBarras } = req.body;
      if (!nome || preco === undefined) {
        return res.status(400).json({ error: 'Campos obrigatórios: nome, preco' });
      }
      const novo = await Produto.create({ nome, descricao, preco, codigoBarras });
      return res.status(201).json(novo);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar produto' });
    }
  },

  async listar(req, res) {
    try {
      const itens = await Produto.findAll({ order: [['id', 'ASC']] });
      return res.json(itens);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar produtos' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco, codigoBarras } = req.body;
      const [count] = await Produto.update({ nome, descricao, preco, codigoBarras }, { where: { id } });
      if (!count) return res.status(404).json({ error: 'Produto não encontrado' });
      const atualizado = await Produto.findByPk(id);
      return res.json(atualizado);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const count = await Produto.destroy({ where: { id } });
      if (!count) return res.status(404).json({ error: 'Produto não encontrado' });
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  },
};
