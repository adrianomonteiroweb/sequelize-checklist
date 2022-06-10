# Sequelize Checklist

Repositório que é um checklist para uso do Sequelize desde a instalação até a configuração de um Model.

### Requisitos:

NPM ou Yarn para instalação, inicialização e gerenciamento do sequelize.

### Instalando o sequelize:

Comando se você usa NPM:

```bash
npm i sequelize
```

```bash
npm i sequelize-cli -D
```

Comando se você usa Yarn:

```bash
yarn add sequelize
```

```bash
yarn add sequelize-cli -D
```

Instale também o módulo referente ao banco que for utilizar junto ao sequelize. Como por exemplo pg para postgres ou mysql2 para mysql. Para isso o comando no caso de uso do postgres seria:

```bash
npm i pg
```

### Iniciando o sequelize:

Para iniciar o sequelize, vamos usar comandos de execução que se você usa NPM será nxp, e se você usar Yarn, será o próprio yarn.

```bash
npx sequelize init
```

ou

```bash
yarn sequelize init
```

Nesse ponto é possível reorganizar as pastas como queira. Após isso, será preciso criar o arquivo .sequelizerc na raiz de seu projeto para definir o caminho correto das pastas.

### Resolvendo caminho de pastas.

Use o módulo path com o método resolve para informar ao sequelize as disposição das pastas em seu projeto. Neste repositório tem a pasta src e o arquivo .sequelizerc para exemplificar melhor.

```js
const path = require("path");

module.exports = {
  config: path.resolve("src", "config", "database.js"),
  "models-path": path.resolve("src", "app", "models"),
  "seeders-path": path.resolve("src", "database", "seeders"),
  "migrations-path": path.resolve("src", "database", "migrations"),
};
```

### Configurações:

Dentro da pasta "config", o arquivo em formado .json estará por padrão com 3 ambientes a ser configurados. Mas vamos iniciar apenas com 1 ambiente e no formato .js já que vamos precisar importar variáveis de ambiente para deixar nossa configuração mais dinâmica.

Atenção para informar corretamente os dados de seu banco, como host, user, password, database e o dialeto, que no exemplo abaixo é postgres.

```js
module.exports = {
  host: "127.0.0.1",
  username: "myuser",
  password: "mypassword",
  database: "mydatabase",
  dialect: "postgres",
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    unserscored: true,
    unserscoredAll: true,
  },
};
```

### Criando uma migration.

Que é um controle de versão no nosso banco de dados referente a dados específicos, como no exemplo a seguir, "users". Evitando problemas de gerenciamento de dados desatualizados pelo uso de mais de 1 desenvolvedor.

```bash
npx sequelize migration:create --name=users-create
```

ou

```bash
yarn sequelize migration:create --name=users-create
```

Depois de criada, vamos configurar:

```js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // cria a tabela com o nome "users"
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER, // tipo
        primaryKey: true, // chave primária
        autoIncrement: true, // auto-incrementável
        allowNull: false, // campo obrigatório
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true, // Valor não pode se repetir
        allowNull: false,
      },
      password_hash: {
        // senha incriptada
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        // data de criação
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        // data de atualização
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  // dropa (deleta) a tabela
  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("users");
  },
};
```

Agora podemos executar a tabela com o comando:

```bash
npx sequelize db:migrate
```

ou

```bash
yarn sequelize db:migrate
```

### Crie o model User.js

Na pasta "models", crie o arquivo "User.js" e crie a função de definição de tipos de dados referente a tabela de usuário.

```js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
  });

  return User;
};
```

# ATENÇãO!!!

### Vamos configurar o arquivo index de configuração na pasta models.

Como mudamos o arquivo de configuração para .js para receber variáveis de ambiente posteriormente, vamos precisar fazer algumas alterações no arquivo index da pasta model. Isso porque o tal arquivo index, serve para fazer com que os models que criarmos dentro da pasta models, fiquem disponíveis para o sequelize.

#### Podemos remover a linha 7:

```js
const env = process.env.NODE_ENV || "development";
```

#### Na nova linha 7, remova o dirname, o array de env e aponte agora o caminho para o arquivo na pasta config:

Antes:

```js
const config = require(__dirname + "/../config/config.json")[env];
```

Depois:

```js
const config = require("../../config/database");
```

#### No código da linha 10 à 20. Vamos remover a condição IF deixando apenas o resultado de condição verdadeira armazenado em uma const. Além disso, vamos passar ao sequelize os parâmetros de forma diferente.

Antes:

```js
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
```

Depois:

```js
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
```

### Import o model User e é hora de testar, como por exemplo em alguma rota:

```js
const routes = require("express").Router();
const { User } = require("./app/models");

User.create({
  name: "Adriano",
  email: "adrianomonteirodev@gmail.com",
  password_hash: "12345678910",
});

module.exports = routes;
```
