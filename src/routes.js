const routes = require("express").Router();
const { User } = require("./app/models");

User.create({
  name: "Adriano",
  email: "adrianomonteirodev@gmail.com",
  password_hash: "12345678910",
});

module.exports = routes;
