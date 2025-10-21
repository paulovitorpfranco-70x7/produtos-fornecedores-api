const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./database/database');

const produtoController = require('./controllers/produtoController');
const fornecedorController = require('./controllers/fornecedorController');
const associacaoController = require('./controllers/associacaoController');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas da API
app.post('/produtos', produtoController.criar);
app.get('/produtos', produtoController.listar);
app.put('/produtos/:id', produtoController.atualizar);
app.delete('/produtos/:id', produtoController.deletar);

app.post('/fornecedores', fornecedorController.criar);
app.get('/fornecedores', fornecedorController.listar);
app.put('/fornecedores/:id', fornecedorController.atualizar);
app.delete('/fornecedores/:id', fornecedorController.deletar);

app.post('/associar', associacaoController.associar);
app.get('/fornecedores/:fornecedorId/produtos', associacaoController.listarPorFornecedor);

// 🔥 Servir o build do frontend React
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Inicializar o servidor e o banco
const PORT = process.env.PORT || 5001;


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao iniciar o servidor:', error);
});
