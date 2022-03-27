const express = require('express');
//controllers
const {
    getAllUsers,
    getUserById,
    createNewUser,
    loginUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller.js');

//middlewares
const {
    validateSession,
    protectAdmin
  } = require('../middlewares/auth.middleware.js');

const {
    protectAccountOwner
  } = require('../middlewares/users.middleware.js');


const router = express.Router();

router.post('/', createNewUser);

router.post('/login', loginUser);

router.use(validateSession);

router.get('/', protectAdmin, getAllUsers);


router
  .route('/:id')
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);


/*router.get('/:id', getUserById);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);*/



module.exports = { usersRouter: router };