const Sequelize = require('sequelize')

const config = {
  database: "Clients",
  host: "localhost",
  port: "3306",
  user: "ghost",
  password: "Claudio Neto6121#",
  type: "mysql",
};
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.type,
});


module.exports = sequelize