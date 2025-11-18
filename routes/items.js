const express = require('express');
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Todas as rotas são protegidas por JWT
router.post('/create', authenticateToken, createItem);
router.get('/list', authenticateToken, getItems);
router.get('/:id', authenticateToken, getItem);
router.put('/:id', authenticateToken, updateItem);
router.delete('/:id', authenticateToken, deleteItem);

module.exports = router;