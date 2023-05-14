const { Op } = require("sequelize");
const client = require("../models/clients.model");
const config = require("../config/connection");

module.exports = {
  getAllClients,
  getClientById,
  getClientByName,
  createClient,
  updateClient,
  deleteClient: _delete,
};

async function getAllClients(req, res) {
  const Clients = await getAll(client);
  res.status(200).send({ data: Clients });
}
async function getClientByName(req, res) {
  const Client = await getUserByName(client, req.params.name);
  res.status(200).send({ data: Client });
}

async function getClientById(req, res) {
  const Client = await getUser(client, req.params.id);

  res.status(200).json({ data: Client });
}

async function createClient(req, res) {
  const Client = await create(client, req.body);
  res.status(201).json({ data: Client });
}

async function updateClient(req, res) {
  const Client = await update(client, req.params.id, req.body);
  res.status(200).json({ data: Client });
}

async function deleteClient(req, res) {
  const Client = await _delete(client, req.params.id);
  res.status(200).json({ data: Client });
}

// helper functions

async function getUserByName(model, name) {
  const user = await model.findAll({ where: { name: { [Op.like]: `%${name}%` } } });
  if (!user) throw "User not found";
  return user;
}

async function getUser(model, id) {
  const user = await model.findOne({ where: { id: id } });
  if (!user) throw "User not found";
  return user;
}

/*******************SEQUELIZE**************** */

async function getAll(model) {
  return await model.findAll({ order: [["createdAt", "DESC"]] });
}

async function getById(model, id) {
  return await getUser(model, id);
}

async function create(model, params) {
  // validate
  if (await model.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.email + '" is already registered';
  }

  const user = await model.create(params);
  console.log({ user });
}

async function update(model, id, params) {
  const user = await getUser(model, id);

  user.update(params);

  user.save();
}

async function _delete(model, id) {
  const user = await getUser(model, id);
  await user.destroy();
}

// helper functions
