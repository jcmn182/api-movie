const express = require('express');
//models 
const {
    getAllMovies,
    getMovieById,
    createNewMovie,
    updateMovie,
    deleteMOvie
} = require('../controllers/movies.controller.js');

//middlewares
const {
    validateSession,
    protectAdmin
  } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.use(validateSession);

router.post('/', createNewMovie);

router.patch('/:id', protectAdmin, updateMovie);

router.delete('/:id', protectAdmin, deleteMOvie);

module.exports = { moviesRouter: router };