const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./database/database');

// ✅ Registra models e associações
require('./models/Produto');
require('./models/Fornecedor');
require('./models/Associacao');

const produtoController = require('./controllers/produtoController');
const fornecedorController = require('./controllers/fornecedorController');
const associacaoController = require('./controllers/associacaoController');

const app = express();
app.use(cors());
app.use(express.json());

// ================= ROTAS API =================
app.post('/api/produtos', produtoController.criar);
app.get('/api/produtos', produtoController.listar);
app.put('/api/produtos/:id', produtoController.atualizar);
app.delete('/api/produtos/:id', produtoController.deletar);

app.post('/api/fornecedores', fornecedorController.criar);
app.get('/api/fornecedores', fornecedorController.listar);
app.put('/api/fornecedores/:id', fornecedorController.atualizar);
app.delete('/api/fornecedores/:id', fornecedorController.deletar);

app.post('/api/associar', associacaoController.associar);
app.get('/api/fornecedores/:fornecedorId/produtos', associacaoController.listarPorFornecedor);

// ================= FRONTEND BUILD =================
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ================= INICIAR SERVIDOR =================
const PORT = process.env.PORT || 5000;


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao iniciar o servidor:', error);
});
