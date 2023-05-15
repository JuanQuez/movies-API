const { getAll, create, getOne, remove, update } = require('../controllers/actor.controller');
const express = require('express');

const actorRoutes = express.Router();

actorRoutes.route('/')
    .get(getAll)
    .post(create);

actorRoutes.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = actorRoutes;