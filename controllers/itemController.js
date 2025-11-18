const { AppDataSource } = require('../config/database');

// CREATE - Criar item
const createItem = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.userId; // Vem do JWT

    if (!title) {
      return res.status(400).json({ error: 'Title é obrigatório' });
    }

    const itemRepo = AppDataSource.getRepository('Item');
    
    const item = await itemRepo.save({
      userId,
      title,
      description: description || null,
      status: status || 'active'
    });

    return res.status(201).json({
      message: 'Item criado com sucesso',
      item
    });
  } catch (error) {
    console.error('Erro ao criar item:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// READ - Listar itens do usuário
const getItems = async (req, res) => {
  try {
    const userId = req.user.userId;
    const itemRepo = AppDataSource.getRepository('Item');
    
    const items = await itemRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });

    return res.json({
      message: 'Itens encontrados',
      count: items.length,
      items
    });
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// READ - Buscar item específico
const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const itemRepo = AppDataSource.getRepository('Item');
    
    const item = await itemRepo.findOne({
      where: { id: parseInt(id), userId }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    return res.json({
      message: 'Item encontrado',
      item
    });
  } catch (error) {
    console.error('Erro ao buscar item:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// UPDATE - Atualizar item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.user.userId;
    const itemRepo = AppDataSource.getRepository('Item');
    
    const item = await itemRepo.findOne({
      where: { id: parseInt(id), userId }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    await itemRepo.update(id, {
      title: title || item.title,
      description: description !== undefined ? description : item.description,
      status: status || item.status
    });

    const updatedItem = await itemRepo.findOneBy({ id: parseInt(id) });

    return res.json({
      message: 'Item atualizado com sucesso',
      item: updatedItem
    });
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// DELETE - Deletar item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const itemRepo = AppDataSource.getRepository('Item');
    
    const item = await itemRepo.findOne({
      where: { id: parseInt(id), userId }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    await itemRepo.delete(id);

    return res.json({
      message: 'Item deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem
};