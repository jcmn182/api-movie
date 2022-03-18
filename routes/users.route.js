const express = require('express');

const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
} = require('../controllers/comment.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createNewUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = { usersRouter: router };