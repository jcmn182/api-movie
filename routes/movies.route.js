const express = require('express');

const { body } = require('express-validator');
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

router
  .route('/')
  .get(getAllMovies)
  .post(
    protectAdmin,
    [
      body('title')
        .isString()
        .withMessage('Title must be a string')
        .notEmpty()
        .withMessage('Must provide a valid title'),
      body('description')
        .isString()
        .withMessage('Description must be a string')
        .notEmpty()
        .withMessage('Must provide a valid description'),
      body('duration')
        .isNumeric()
        .withMessage('Duration must be a number')
        .custom((value) => value > 0)
        .withMessage('Duration must be greater than 0'),
      body('rating')
        .isNumeric()
        .withMessage('Rating must be a number')
        .custom((value) => value > 0 && value <= 5)
        .withMessage('Rating must be between 1 and 5'),
      body('genre')
        .isString()
        .withMessage('Genre must be a string')
        .notEmpty()
        .withMessage('Must provide a valid genre'),
      body('actors')
        .isArray({ min: 1 })
        .withMessage('Must provide at least one actor id')
    ],
    createNewMovie
  );

router.route('/:id')
.get(getMovieById)
.patch(protectAdmin, updateMovie)
.delete(protectAdmin, deleteMOvie);


module.exports = { moviesRouter: router };