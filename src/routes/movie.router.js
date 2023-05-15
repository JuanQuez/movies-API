const { getAll, create, getOne, remove, update, setMovieGenres, setMovieActors, setMovieDirectors, } = require('../controllers/movie.controller');
const express = require('express');

const movieRoutes = express.Router();

movieRoutes.route('/')
    .get(getAll)
    .post(create);

movieRoutes.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRoutes.route('/:id/genres')
    .post(setMovieGenres)

movieRoutes.route('/:id/actors')
    .post(setMovieActors)

movieRoutes.route('/:id/directors')
    .post(setMovieDirectors)

module.exports = movieRoutes;