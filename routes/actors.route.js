const express = require('express');

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

router.post('/', createNewActor);

router.patch('/:id', updateActor);

router.delete('/:id', deleteActor);

router.patch('/:id/assing-movie', assingMovietoActor)

module.exports = { actorsRouter: router };