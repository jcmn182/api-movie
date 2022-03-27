const express = require('express');
//controllers
const {
    getAllPost,
    getPostById,
    createPost,
    updatePostPatch,
    deletePost

} = require('../controllers/post.controller.js');

//middlewares
const {
    validateSession,
    protectAdmin
  } = require('../middlewares/auth.middleware.js');

const {
    protectAccountOwner
  } = require('../middlewares/users.middleware.js');


const router = express.Router();


router.use(validateSession);

router.get('/', protectAdmin, getAllPost);

router.get('/:id', getPostById);

router.post('/new-review', createPost);

router.patch('/', protectAccountOwner, updatePostPatch);

router.delete('/', protectAccountOwner, deletePost);


module.exports = { postRouter: router };