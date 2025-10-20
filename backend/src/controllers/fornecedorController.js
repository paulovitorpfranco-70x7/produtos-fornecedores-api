const Fornecedor = require('../models/Fornecedor');

module.exports = {
  async criar(req, res) {
    try {
      const { nome, cnpj } = req.body;
      if (!nome) return res.status(400).json({ error: 'Campo obrigatório: nome' });
      const novo = await Fornecedor.create({ nome, cnpj });
      return res.status(201).json(novo);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar fornecedor' });
    }
  },

  async listar(req, res) {
    try {
      const itens = await Fornecedor.findAll({ order: [['id', 'ASC']] });
      return res.json(itens);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar fornecedores' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, cnpj } = req.body;
      const [count] = await Fornecedor.update({ nome, cnpj }, { where: { id } });
      if (!count) return res.status(404).json({ error: 'Fornecedor não encontrado' });
      const atualizado = await Fornecedor.findByPk(id);
      return res.json(atualizado);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const count = await Fornecedor.destroy({ where: { id } });
      if (!count) return res.status(404).json({ error: 'Fornecedor não encontrado' });
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao deletar fornecedor' });
    }
  },
};
