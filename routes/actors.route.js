const express = require('express');

const { body } = require('express-validator');

const {
    getAllActors,
    getActorById,
    createNewActor,
    updateActor,
    deleteActor,
    assingMovietoActor
} = require('../controllers/actors.controller.js');

//middlewares
const {
    validateSession,
    protectAdmin
  } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', getAllActors);

router.get('/:id', getActorById);

router.use(validateSession);

router
  .route('/')
  .get(getAllActors)
  .post(
    protectAdmin,
    [
      body('name')
      .isString()
      .notEmpty(),
      body('country')
        .isString()
        .withMessage('Country must be a string')
        .notEmpty()
        .withMessage('Must provide a valid country name'),
      body('age')
        .isNumeric()
        .withMessage('Age must be a number')
        .custom((value) => value > 0)
        .withMessage('Age must be greater than 0')
    ],
    createNewActor
  );

router.patch('/:id', updateActor);

router.delete('/:id', deleteActor);

router.patch('/:id/assing-movie', assingMovietoActor)

module.exports = { actorsRouter: router };