const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../config/database');

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: 'username, password e email são obrigatórios' });
    }
    if (password.length < 4) {
      return res.status(400).json({ error: 'password deve ter ao menos 4 caracteres' });
    }

    const userRepo = AppDataSource.getRepository('User');
    
    const existingUser = await userRepo.findOneBy({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userRepo.save({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: { username }
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Nome de usuário e senha são obrigatórios' });
    }

    const userRepo = AppDataSource.getRepository('User');
    const user = await userRepo.findOneBy({ username });
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({ 
      message: 'Login efetuado com sucesso', 
      user: { username },
      token: token,
      redirect: '/dashboard'
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { register, login };