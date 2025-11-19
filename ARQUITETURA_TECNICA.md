# 🦸 Arquitetura Técnica 

## 📋 Visão Geral do Projeto

Este documento explica como as tecnologias **Express**, **TypeORM**, **SQLite**, **JWT** e **Bcrypt** trabalham juntas para criar um sistema completo de autenticação e gerenciamento de times de heróis.

---

## 🌐 1. EXPRESS - Servidor Web

### **Responsabilidade:**
Gerenciar requisições HTTP, roteamento e middlewares.

### **Como funciona:**
```javascript
// app.js - Configuração principal
const app = express();

// Middlewares globais
app.use(cors());                    // Permite requisições externas
app.use(express.json());            // Converte JSON do body

// Roteamento
app.use('/api/auth', authRoutes);   // Rotas de autenticação
app.use('/api/heroes', heroRoutes); // Rotas de heróis

app.listen(3001);                   // Servidor na porta 3001
```

### **Fluxo:**
1. **Recebe** requisição HTTP (GET, POST, PUT, DELETE)
2. **Parseia** dados JSON do body
3. **Roteia** para o controller apropriado
4. **Retorna** resposta JSON estruturada

---

## 🛡️ 2. MIDDLEWARE - Camada de Segurança

### **Responsabilidade:**
Interceptar requisições e verificar autenticação antes dos controllers.

### **Como funciona:**
```javascript
// middleware/auth.js
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ error: 'Token requerido' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        
        req.user = user;  // Injeta dados do usuário na requisição
        next();           // Passa para o próximo middleware/controller
    });
}
```

### **Fluxo de Segurança:**
1. **Extrai** token do header `Authorization: Bearer TOKEN`
2. **Verifica** assinatura do JWT com chave secreta
3. **Decodifica** payload (userId, username, expiração)
4. **Injeta** `req.user` para uso nos controllers
5. **Bloqueia** acesso se token inválido/expirado

---

## 🎮 3. CONTROLLERS - Lógica de Negócio

### **Responsabilidade:**
Processar dados, aplicar regras de negócio e coordenar operações.

### **Exemplo - Criar Herói:**
```javascript
// controllers/heroController.js
const createHero = async (req, res) => {
    try {
        // 1. Extrair dados
        const { nome, habilidade, nivel } = req.body;  // Do Express
        const userId = req.user.userId;                // Do Middleware JWT
        
        // 2. Validar dados
        if (!validarNome(nome)) {                      // Utils/Validadores
            return res.status(400).json({ 
                error: 'Nome inválido',
                nomesValidos: NOMES_VALIDOS 
            });
        }
        
        // 3. Interagir com banco
        const heroRepo = AppDataSource.getRepository('Hero'); // TypeORM
        const hero = await heroRepo.save({                     // SQL via ORM
            userId, nome, habilidade, nivel
        });
        
        // 4. Retornar resposta
        return res.status(201).json({
            message: 'Herói criado!',
            hero
        });
        
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno' });
    }
};
```

### **Coordenação:**
- **Recebe** dados validados do Express e Middleware
- **Aplica** regras de negócio e validações
- **Comunica** com banco via TypeORM
- **Formata** e retorna resposta padronizada

---

## 🗄️ 4. TYPEORM - Object-Relational Mapping

### **Responsabilidade:**
Traduzir objetos JavaScript para comandos SQL e vice-versa.

### **A) Configuração do Banco:**
```javascript
// config/database.js
const AppDataSource = new DataSource({
    type: "sqlite",                    // Tipo do banco
    database: "heroes.sqlite",         // Arquivo do banco
    synchronize: true,                 // Cria tabelas automaticamente
    entities: [User, Hero],            // Modelos que viram tabelas
});
```

### **B) Definição de Modelos:**
```javascript
// models/Hero.js
const Hero = new EntitySchema({
    name: "Hero",                      // Nome da entidade
    tableName: "heroes_team",          // Nome da tabela no SQL
    columns: {
        id: { 
            primary: true,             // PRIMARY KEY
            type: "int", 
            generated: true            // AUTOINCREMENT
        },
        nome: { type: "varchar" },     // VARCHAR
        nivel: { 
            type: "int", 
            default: 1                 // DEFAULT 1
        },
        createdAt: { 
            type: "datetime", 
            createDate: true           // TIMESTAMP automático
        }
    }
});
```

### **C) Repository Pattern:**
```javascript
const heroRepo = AppDataSource.getRepository('Hero');

// JavaScript → SQL
await heroRepo.save({ nome: "Superman", nivel: 95 });
// Gera: INSERT INTO heroes_team (nome, nivel) VALUES ('Superman', 95)

await heroRepo.find({ where: { userId: 1 } });
// Gera: SELECT * FROM heroes_team WHERE userId = 1

await heroRepo.update(1, { nivel: 100 });
// Gera: UPDATE heroes_team SET nivel = 100 WHERE id = 1
```

### **Vantagens:**
- **Abstração**: Trabalha com objetos, não SQL puro
- **Segurança**: Previne SQL Injection automaticamente
- **Produtividade**: Gera SQL automaticamente
- **Portabilidade**: Funciona com vários bancos (SQLite, MySQL, PostgreSQL)

---

## 🗃️ 5. SQLITE - Banco de Dados

### **Responsabilidade:**
Armazenar dados de forma persistente e estruturada.

### **Estrutura das Tabelas:**
```sql
-- Tabela users (gerada pelo TypeORM)
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela heroes_team (gerada pelo TypeORM)
CREATE TABLE heroes_team (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    nome VARCHAR NOT NULL,
    habilidade VARCHAR NOT NULL,
    nivel INTEGER DEFAULT 1,
    categoria VARCHAR DEFAULT 'Herói',
    origem VARCHAR,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### **Características do SQLite:**
- **Arquivo único**: Tudo em um arquivo `.sqlite`
- **Sem servidor**: Não precisa instalar servidor separado
- **ACID**: Transações seguras
- **Portável**: Funciona em qualquer sistema operacional

---

## 🔐 6. BCRYPT - Criptografia de Senhas

### **Responsabilidade:**
Criptografar senhas de forma segura e irreversível.

### **Processo de Hash:**
```javascript
// Cadastro - Criptografar senha
const salt = await bcrypt.genSalt(10);                    // Gera salt aleatório
const hashedPassword = await bcrypt.hash(password, salt); // Hash + salt

// Exemplo:
// Senha: "123456"
// Salt: "$2b$10$abcdefghijklmnopqrstuv"
// Hash: "$2b$10$abcdefghijklmnopqrstuv.XYZ123hash456encrypted789"
```

### **Verificação de Senha:**
```javascript
// Login - Verificar senha
const senhaCorreta = await bcrypt.compare(password, hashedPassword);
// Compara "123456" com o hash armazenado
// Retorna: true ou false
```

### **Segurança:**
- **Salt**: Previne ataques de rainbow table
- **Irreversível**: Impossível descriptografar
- **Adaptativo**: Pode aumentar complexidade com o tempo
- **Padrão da indústria**: Usado por grandes empresas

---

## 🎫 7. JWT - JSON Web Tokens

### **Responsabilidade:**
Autenticação stateless (sem sessão no servidor).

### **Estrutura do Token:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4ifQ.signature
│                                      │                                    │
Header (algoritmo + tipo)              Payload (dados do usuário)          Signature (segurança)
```

### **Geração (Login):**
```javascript
const token = jwt.sign(
    { 
        userId: user.id,           // Dados do usuário
        username: user.username 
    },
    process.env.JWT_SECRET,        // Chave secreta (256 bits)
    { expiresIn: '24h' }          // Expiração
);
```

### **Verificação (Middleware):**
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// decoded = { 
//     userId: 1, 
//     username: "admin", 
//     iat: 1637123456,    // Issued at
//     exp: 1637209856     // Expires at
// }
```

### **Vantagens:**
- **Stateless**: Servidor não precisa armazenar sessões
- **Escalável**: Funciona em múltiplos servidores
- **Seguro**: Assinatura digital previne alterações
- **Padrão**: RFC 7519, amplamente adotado

---

## ✅ 8. UTILS/VALIDADORES - Regras de Negócio

### **Responsabilidade:**
Implementar validações específicas do domínio (heróis).

### **Vetores de Validação:**
```javascript
// utils/heroValidators.js
const NOMES_VALIDOS = [
    "Superman", "Batman", "Wonder Woman", "Flash", "Aquaman",
    "Spider-Man", "Iron Man", "Captain America", "Thor", "Hulk"
    // ... 32 heróis no total
];

const HABILIDADES_VALIDAS = [
    "Voo", "Super Força", "Velocidade", "Invisibilidade",
    "Telepatia", "Teletransporte", "Controle Mental"
    // ... 25 habilidades no total
];
```

### **Funções de Validação:**
```javascript
const validarNome = (nome) => {
    return NOMES_VALIDOS.includes(nome);
};

const validarHabilidade = (habilidade) => {
    return HABILIDADES_VALIDAS.includes(habilidade);
};

const validarNivel = (nivel) => {
    return nivel >= 1 && nivel <= 100;
};
```

---

## 🔄 Fluxo Completo de uma Requisição

### **Exemplo: POST /api/heroes/create**

```
1. Cliente (Postman)
   ↓ Envia: JSON + Authorization Header
   
2. Express
   ↓ Parseia JSON, roteia para /api/heroes/create
   
3. Middleware (authenticateToken)
   ↓ Verifica JWT, injeta req.user
   
4. Controller (createHero)
   ↓ Extrai dados, aplica validações
   
5. Utils/Validadores
   ↓ Verifica se nome/habilidade são válidos
   
6. TypeORM Repository
   ↓ Converte objeto JS para SQL INSERT
   
7. SQLite
   ↓ Executa INSERT, retorna dados salvos
   
8. TypeORM
   ↓ Converte resultado SQL para objeto JS
   
9. Controller
   ↓ Formata resposta JSON
   
10. Express
    ↓ Envia resposta HTTP
    
11. Cliente
    ↓ Recebe JSON com herói criado
```

---

## 🎯 Benefícios da Arquitetura

### **Separação de Responsabilidades:**
- **Express**: Comunicação HTTP
- **Middleware**: Segurança
- **Controllers**: Lógica de negócio
- **TypeORM**: Persistência de dados
- **Utils**: Validações específicas

### **Segurança em Camadas:**
- **JWT**: Autenticação stateless
- **Bcrypt**: Senhas criptografadas
- **Middleware**: Verificação de tokens
- **Validadores**: Dados consistentes

### **Facilidade de Manutenção:**
- **Modular**: Cada arquivo tem uma responsabilidade
- **Testável**: Componentes isolados
- **Escalável**: Fácil adicionar novas funcionalidades
- **Legível**: Código organizado e documentado

---

## 📚 Tecnologias e Suas Interações

| Tecnologia | Função Principal | Comunica Com |
|------------|------------------|--------------|
| **Express** | Servidor HTTP | Middleware, Controllers |
| **JWT** | Autenticação | Middleware, Controllers |
| **Bcrypt** | Criptografia | Controllers (auth) |
| **TypeORM** | ORM/Persistência | Controllers, SQLite |
| **SQLite** | Banco de Dados | TypeORM |
| **Utils** | Validações | Controllers |

---

## 🚀 Conclusão

Este projeto demonstra como diferentes tecnologias podem trabalhar em harmonia para criar uma aplicação robusta e segura. Cada tecnologia tem sua responsabilidade específica, mas todas se comunicam de forma orquestrada para entregar uma experiência completa de desenvolvimento backend.

A arquitetura escolhida segue padrões da indústria e boas práticas, tornando o código:
- **Seguro** (JWT + Bcrypt)
- **Escalável** (Arquitetura modular)
- **Manutenível** (Separação de responsabilidades)
- **Testável** (Componentes isolados)

---