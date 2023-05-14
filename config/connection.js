const Sequelize = require("sequelize");
require("dotenv").config();

console.log(process.env.DB_PASSWORD);
const config = {
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: "mysql",
};
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.type,
});

module.exports = {sequelize, config};
