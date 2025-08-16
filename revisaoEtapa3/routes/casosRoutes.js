const casosController = require('../controllers/casosController');
const express = require('express');
const routes = express.Router();

routes.get("/", casosController.getAll);
routes.get("/:id", casosController.getById);
routes.post("/", casosController.post);
routes.put("/:id", casosController.put);
routes.patch("/:id", casosController.patch);
routes.delete("/:id", casosController.remove);

module.exports = routes;