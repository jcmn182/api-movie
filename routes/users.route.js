const express = require('express');

const {
    getAllUsers,
    getUserById,
    createNewUser,
    loginUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller.js');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createNewUser);

router.post('/login', loginUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);



module.exports = { usersRouter: router };