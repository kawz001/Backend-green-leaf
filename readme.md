# Trail App Backend

Este repositório contém o backend para o aplicativo de trilha. O backend é responsável por gerenciar a lógica do servidor, a API para comunicação com o frontend e a interação com o banco de dados.

## Tecnologias Utilizadas

- **Linguagem**: [Node.js](https://nodejs.org/) (ou substitua pela linguagem que você está usando, como Python, Java, etc.)
- **Framework**: [Express](https://expressjs.com/) (ou o framework relevante para a sua escolha de linguagem)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (ou substitua pelo banco de dados que você está usando)
- **ORM**: [Sequelize](https://sequelize.org/) (ou substitua pelo ORM ou método de acesso a dados que você está usando)
- **Autenticação**: [JWT](https://jwt.io/) (JSON Web Tokens) para autenticação e autorização

## Requisitos

- [Node.js](https://nodejs.org/) v14.x ou superior
- [NPM](https://www.npmjs.com/) (ou [Yarn](https://yarnpkg.com/)) para gerenciar dependências
- Banco de dados PostgreSQL (ou outro banco de dados suportado)

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/trail-app-backend.git
    cd trail-app-backend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```env
    DB_HOST=localhost
    DB_USER=seu-usuario
    DB_PASS=sua-senha
    DB_NAME=nome-do-banco
    JWT_SECRET=sua-chave-secreta
    ```

4. Execute as migrações de banco de dados:

    ```bash
    npx sequelize-cli db:migrate
    ```

5. Inicie o servidor:

    ```bash
    npm start
    ```

## Endpoints da API

- **GET /trails**: Retorna a lista de trilhas.
- **POST /trails**: Adiciona uma nova trilha.
- **PUT /trails/:id**: Atualiza informações de uma trilha.
- **DELETE /trails/:id**: Remove uma trilha.

Para ver a documentação completa da API, consulte o arquivo [API.md](./API.md).

## Scripts de Teste

Para rodar os testes:

```bash
npm test

