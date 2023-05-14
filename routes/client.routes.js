const {
  deleteClient,
  getAllClients,
  createClient,
  updateClient,
  getClientById,
  getClientByName,
} = require("../controllers/clients.controller");
const express = require("express");
const routes = express.Router();

routes.route("/").get(getAllClients).post(createClient);
routes
  .route("/user/:id")
  .get(getClientById)
  .delete(deleteClient)
  .patch(updateClient);
routes.route("/:name").get(getClientByName);

module.exports = routes;
