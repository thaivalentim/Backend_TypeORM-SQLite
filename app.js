const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { AppDataSource } = require('./config/database');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');

const app = express();
const port = 3001;

// Inicializar conexão SQLite
AppDataSource.initialize()
  .then(() => console.log('✅ Conectado ao SQLite'))
  .catch(error => console.log('❌ Erro:', error));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});