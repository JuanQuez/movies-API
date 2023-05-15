const express = require('express');
const genreRoutes = require('./genre.router');
const actorRoutes = require('./actor.router');
const directorRoutes = require('./director.router');
const movieRoutes = require('./movie.router');
const router = express.Router();

// colocar las rutas aquí

router.use('/genres', genreRoutes)
router.use('/actors', actorRoutes)
router.use('/directors', directorRoutes)
router.use('/movies', movieRoutes)

module.exports = router;