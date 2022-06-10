module.exports = {
  host: "127.0.0.1",
  username: "docker",
  password: "docker",
  database: "nodeauth",
  dialect: "postgres",
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    unserscored: true,
    unserscoredAll: true,
  },
};
