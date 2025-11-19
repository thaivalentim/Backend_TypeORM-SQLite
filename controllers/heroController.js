const { AppDataSource } = require('../config/database');
const {
    validarNome,
    validarHabilidade,
    validarCategoria,
    validarOrigem,
    validarNivel,
    NOMES_VALIDOS,
    HABILIDADES_VALIDAS
} = require('../utils/heroValidators');

// CREATE - Adicionar herói ao time
const createHero = async (req, res) => {
    try {
        const { nome, habilidade, nivel, categoria, origem } = req.body;
        const userId = req.user.userId;

        // Validações obrigatórias
        if (!nome || !habilidade) {
            return res.status(400).json({ error: 'Nome e habilidade são obrigatórios' });
        }

        // Validar nome
        if (!validarNome(nome)) {
            return res.status(400).json({ 
                error: 'Nome de herói inválido',
                nomesValidos: NOMES_VALIDOS
            });
        }

        // Validar habilidade
        if (!validarHabilidade(habilidade)) {
            return res.status(400).json({ 
                error: 'Habilidade inválida',
                habilidadesValidas: HABILIDADES_VALIDAS
            });
        }

        // Validar nível
        const nivelFinal = nivel || 1;
        if (!validarNivel(nivelFinal)) {
            return res.status(400).json({ error: 'Nível deve estar entre 1 e 100' });
        }

        // Validar categoria
        if (categoria && !validarCategoria(categoria)) {
            return res.status(400).json({ error: 'Categoria inválida' });
        }

        // Validar origem
        if (origem && !validarOrigem(origem)) {
            return res.status(400).json({ error: 'Origem inválida' });
        }

        const heroRepo = AppDataSource.getRepository('Hero');

        // Verificar se herói já existe no time do usuário
        const existingHero = await heroRepo.findOne({
            where: { userId, nome }
        });

        if (existingHero) {
            return res.status(409).json({ error: 'Este herói já está no seu time' });
        }

        const hero = await heroRepo.save({
            userId,
            nome,
            habilidade,
            nivel: nivelFinal,
            categoria: categoria || 'Herói',
            origem: origem || null
        });

        return res.status(201).json({
            message: 'Herói adicionado ao time com sucesso!',
            hero
        });
    } catch (error) {
        console.error('Erro ao criar herói:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// READ - Listar time de heróis
const getHeroes = async (req, res) => {
    try {
        const userId = req.user.userId;
        const heroRepo = AppDataSource.getRepository('Hero');

        const heroes = await heroRepo.find({
            where: { userId },
            order: { nivel: 'DESC', createdAt: 'ASC' }
        });

        return res.json({
            message: 'Time de heróis encontrado',
            totalHeroes: heroes.length,
            team: heroes
        });
    } catch (error) {
        console.error('Erro ao buscar heróis:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// READ - Buscar herói específico
const getHero = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const heroRepo = AppDataSource.getRepository('Hero');

        const hero = await heroRepo.findOne({
            where: { id: parseInt(id), userId }
        });

        if (!hero) {
            return res.status(404).json({ error: 'Herói não encontrado no seu time' });
        }

        return res.json({
            message: 'Herói encontrado',
            hero
        });
    } catch (error) {
        console.error('Erro ao buscar herói:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// UPDATE - Atualizar herói
const updateHero = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, habilidade, nivel, categoria, origem } = req.body;
        const userId = req.user.userId;
        const heroRepo = AppDataSource.getRepository('Hero');

        const hero = await heroRepo.findOne({
            where: { id: parseInt(id), userId }
        });

        if (!hero) {
            return res.status(404).json({ error: 'Herói não encontrado no seu time' });
        }

        // Validações se campos foram fornecidos
        if (nome && !validarNome(nome)) {
            return res.status(400).json({ error: 'Nome de herói inválido' });
        }

        if (habilidade && !validarHabilidade(habilidade)) {
            return res.status(400).json({ error: 'Habilidade inválida' });
        }

        if (nivel && !validarNivel(nivel)) {
            return res.status(400).json({ error: 'Nível deve estar entre 1 e 100' });
        }

        if (categoria && !validarCategoria(categoria)) {
            return res.status(400).json({ error: 'Categoria inválida' });
        }

        if (origem && !validarOrigem(origem)) {
            return res.status(400).json({ error: 'Origem inválida' });
        }

        await heroRepo.update(id, {
            nome: nome || hero.nome,
            habilidade: habilidade || hero.habilidade,
            nivel: nivel || hero.nivel,
            categoria: categoria || hero.categoria,
            origem: origem !== undefined ? origem : hero.origem
        });

        const updatedHero = await heroRepo.findOneBy({ id: parseInt(id) });

        return res.json({
            message: 'Herói atualizado com sucesso!',
            hero: updatedHero
        });
    } catch (error) {
        console.error('Erro ao atualizar herói:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// DELETE - Remover herói do time
const deleteHero = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const heroRepo = AppDataSource.getRepository('Hero');

        const hero = await heroRepo.findOne({
            where: { id: parseInt(id), userId }
        });

        if (!hero) {
            return res.status(404).json({ error: 'Herói não encontrado no seu time' });
        }

        await heroRepo.delete(id);

        return res.json({
            message: `${hero.nome} foi removido do seu time!`
        });
    } catch (error) {
        console.error('Erro ao deletar herói:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    createHero,
    getHeroes,
    getHero,
    updateHero,
    deleteHero
};