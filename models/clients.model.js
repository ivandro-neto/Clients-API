const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = require("../config/connection");

const attributes = {
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  phone: { type: Sequelize.STRING, allowNull: false },
  service: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  paid: { type: Sequelize.BOOLEAN, allowNull: false },
  plans: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: true },
};

const options = {
  defaultScope: {
    // exclude password hash by default
    attributes: { exclude: ["passwordHash"] },
  },
  scopes: {
    // include hash with this scope
    withHash: { attributes: {} },
  },
};

const model = sequelize.define("clients", attributes, options);

module.exports = model;
