# TypeORM + SQLite: Aprendendo sobre backend, banco de dados, persistência de dados e CRUD

Um projeto didático para aprender **TypeORM**, **SQLite** e desenvolvimento de **APIs REST** com Node.js e Express.

## 📋 O que este projeto faz?

- **Sistema de cadastro e login** com JWT
- **CRUD completo** para gerenciar itens pessoais
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
│   └── database.js          # Configuração do SQLite
├── controllers/
│   ├── authController.js    # Lógica de login/cadastro
│   └── itemController.js    # CRUD dos itens
├── middleware/
│   └── auth.js              # Verificação JWT
├── models/
│   ├── User.js              # Modelo da tabela users
│   └── Item.js              # Modelo da tabela items
├── routes/
│   ├── auth.js              # Rotas de autenticação
│   └── items.js             # Rotas CRUD
├── .env                     # Variáveis de ambiente
├── app.js                   # Servidor principal
└── users.sqlite             # Banco de dados 
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
Crie um arquivo `.env` na raiz do projeto:
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

### CRUD de Itens (Requer autenticação)

#### Criar item
```http
POST /api/items/create
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "title": "Minha tarefa",
  "description": "Descrição da tarefa",
  "status": "pending"
}
```

#### Listar itens
```http
GET /api/items/list
Authorization: Bearer SEU_TOKEN
```

#### Buscar item específico
```http
GET /api/items/:id
Authorization: Bearer SEU_TOKEN
```

#### Atualizar item
```http
PUT /api/items/:id
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "title": "Título atualizado",
  "status": "completed"
}
```

#### Deletar item
```http
DELETE /api/items/:id
Authorization: Bearer SEU_TOKEN
```

## 🔐 Como testar com Postman

1. **Cadastre um usuário** usando `/api/auth/register`
2. **Faça login** usando `/api/auth/login`
3. **Copie o token** da resposta do login
4. **Use o token** no header `Authorization: Bearer TOKEN` nas rotas protegidas
5. **Teste o CRUD** criando, listando, atualizando e deletando itens

## 🗄️ Banco de dados

O projeto usa **SQLite** com duas tabelas:

### Tabela `users`
- `id` - Chave primária auto-incremento
- `username` - Nome de usuário único
- `email` - Email único
- `password` - Senha criptografada (bcrypt)
- `createdAt` - Data de criação

### Tabela `items`
- `id` - Chave primária auto-incremento
- `userId` - Referência ao usuário
- `title` - Título do item
- `description` - Descrição (opcional)
- `status` - Status do item (active, pending, completed)
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

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
- **Relacionamentos** entre tabelas

## 🔧 Scripts disponíveis

- `npm start` - Executa o servidor
- `npm run dev` - Executa com auto-reload

## 📚 Para visualizar o banco

Use o **DB Browser for SQLite** para abrir o arquivo `users.sqlite` e visualizar os dados.

## 🤝 Contribuindo

Este é um projeto didático! Sinta-se livre para:
- Fazer fork
- Sugerir melhorias
- Adicionar novas funcionalidades
- Usar como base para seus projetos

---

**Projeto didático desenvolvido para apresentação amadora sobre Type ORM, SQLite e APIs REST com Node.js e Express.**🎓