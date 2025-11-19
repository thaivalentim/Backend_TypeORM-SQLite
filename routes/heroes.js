const express = require('express');
const {
    createHero,
    getHeroes,
    getHero,
    updateHero,
    deleteHero
} = require('../controllers/heroController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Todas as rotas são protegidas por JWT
router.post('/create', authenticateToken, createHero);
router.get('/team', authenticateToken, getHeroes);
router.get('/:id', authenticateToken, getHero);
router.put('/:id', authenticateToken, updateHero);
router.delete('/:id', authenticateToken, deleteHero);

module.exports = router;