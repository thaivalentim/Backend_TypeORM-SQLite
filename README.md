# Backend com Node.js + Express + TypeORM + SQLite

Um projeto didático para aprender **TypeORM**, **SQLite** e desenvolvimento de **APIs REST** com Node.js e Express.

## 📋 O que este projeto faz?

- **Sistema de cadastro e login** com JWT
- **Montagem de times de heróis** com validação rigorosa
- **CRUD completo** para gerenciar heróis
- **Autenticação segura** com bcrypt e tokens
- **Banco SQLite** com TypeORM
- **API REST** testável via Postman

## 🛠️ Tecnologias utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeORM** - ORM para TypeScript/JavaScript
- **SQLite** - Banco de dados local
- **JWT** - Autenticação via tokens
- **Bcrypt** - Criptografia de senhas

## 📁 Estrutura do projeto

```
├── config/
│   └── database.js         # Configuração do SQLite
├── controllers/
│   ├── authController.js   # Lógica de login/cadastro
│   └── heroController.js   # CRUD dos heróis
├── middleware/
│   └── auth.js             # Verificação JWT
├── models/
│   ├── User.js             # Modelo da tabela users
│   └── Hero.js             # Modelo da tabela heroes_team
├── routes/
│   ├── auth.js             # Rotas de autenticação
│   └── heroes.js           # Rotas CRUD de heróis
├── utils/
│   └── heroValidators.js   # Validadores de heróis
├── .env                    # Variáveis de ambiente
├── app.js                  # Servidor principal
└── heroes.sqlite           # Banco de dados (gerado automaticamente)
```

## 🚀 Como executar

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd TypeORM_SQLite
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Copie `.env.example` para `.env` e configure:
```
JWT_SECRET=sua_chave_secreta_aqui_256_bits
```

### 4. Execute o servidor
```bash
npm start
```

O servidor estará rodando em `http://localhost:3001`

## 📡 Endpoints da API

### Autenticação

#### Cadastro
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "seu_usuario",
  "password": "sua_senha",
  "email": "seu@email.com"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

### CRUD de Heróis (Requer autenticação)

#### Criar herói
```http
POST /api/heroes/create
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nome": "Superman",
  "habilidade": "Voo",
  "nivel": 95,
  "categoria": "Alienígena",
  "origem": "Krypton"
}
```

#### Listar time
```http
GET /api/heroes/team
Authorization: Bearer SEU_TOKEN
```

#### Buscar herói específico
```http
GET /api/heroes/:id
Authorization: Bearer SEU_TOKEN
```

#### Atualizar herói
```http
PUT /api/heroes/:id
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "nivel": 100,
  "categoria": "Deus"
}
```

#### Deletar herói
```http
DELETE /api/heroes/:id
Authorization: Bearer SEU_TOKEN
```

## 🔐 Como testar com Postman

1. **Cadastre um usuário** usando `/api/auth/register`
2. **Faça login** usando `/api/auth/login`
3. **Copie o token** da resposta do login
4. **Use o token** no header `Authorization: Bearer TOKEN` nas rotas protegidas
5. **Monte seu time** criando, listando, atualizando e removendo heróis

## 🗄️ Banco de dados

O projeto usa **SQLite** com duas tabelas:

### Tabela `users`
- `id` - Chave primária auto-incremento
- `username` - Nome de usuário único
- `email` - Email único
- `password` - Senha criptografada (bcrypt)
- `createdAt` - Data de criação

### Tabela `heroes_team`
- `id` - Chave primária auto-incremento
- `userId` - Referência ao usuário
- `nome` - Nome do herói (validado)
- `habilidade` - Poder do herói (validado)
- `nivel` - Nível do herói (1-100)
- `categoria` - Tipo do herói
- `origem` - Origem do herói
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

## 🦸‍♂️ Heróis Disponíveis

**32 heróis válidos:** Superman, Batman, Wonder Woman, Flash, Spider-Man, Iron Man, Captain America, Thor, Hulk, e mais!

**25 habilidades válidas:** Voo, Super Força, Velocidade, Invisibilidade, Telepatia, Magia, e mais!

## 📚 Para visualizar o banco

Use o **DB Browser for SQLite** para abrir o arquivo `heroes.sqlite` e visualizar os dados.

## 🎯 Conceitos aprendidos

- **ORM (Object-Relational Mapping)** com TypeORM
- **EntitySchema** para definir modelos
- **Repository Pattern** para operações no banco
- **Middleware** para autenticação
- **JWT** para sessões stateless
- **Bcrypt** para segurança de senhas
- **Arquitetura MVC** (Model-View-Controller)
- **API REST** com Express
- **CRUD** completo
- **Validações** de dados

## 🔧 Scripts disponíveis

- `npm start` - Executa o servidor
- `npm run dev` - Executa com auto-reload

## 📖 Documentação Técnica

Veja o arquivo `ARQUITETURA_TECNICA.md` para entender como todas as tecnologias trabalham juntas.

## 🤝 Contribuindo

Este é um projeto didático! Sinta-se livre para:
- Fazer fork
- Sugerir melhorias
- Adicionar novas funcionalidades
- Usar como base para seus projetos