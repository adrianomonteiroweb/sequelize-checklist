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
