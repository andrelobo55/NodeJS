const agentesController = require('../controllers/agentesController');
const express = require('express');
const routes = express.Router();

routes.get("/", agentesController.getAll);
routes.get("/:id", agentesController.getById);
routes.post("/", agentesController.post);
routes.put("/:id", agentesController.put);
routes.patch("/:id", agentesController.patch);
routes.delete("/:id", agentesController.remove);

module.exports = routes;