const express = require('express');
const produtoController = require('../controllers/produtoController');
const fornecedorController = require('../controllers/fornecedorController');
const associacaoController = require('../controllers/associacaoController');

const router = express.Router();

// Produtos
router.post('/produtos', produtoController.criar);
router.get('/produtos', produtoController.listar);
router.put('/produtos/:id', produtoController.atualizar);
router.delete('/produtos/:id', produtoController.deletar);

// Fornecedores
router.post('/fornecedores', fornecedorController.criar);
router.get('/fornecedores', fornecedorController.listar);
router.put('/fornecedores/:id', fornecedorController.atualizar);
router.delete('/fornecedores/:id', fornecedorController.deletar);

// Associação
router.post('/associar', associacaoController.associar);
router.get('/fornecedores/:fornecedorId/produtos', associacaoController.listarPorFornecedor);

module.exports = router;
