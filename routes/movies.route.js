const express = require('express');

const {
    getAllMovies,
    getMovieById,
    createNewMovie,
    updateMovie,
    deleteMOvie
} = require('../controllers/movies.controller.js');

const router = express.Router();

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', createNewMovie);

router.patch('/:id', updateMovie);

router.delete('/:id', deleteMOvie);

module.exports = { moviesRouter: router };