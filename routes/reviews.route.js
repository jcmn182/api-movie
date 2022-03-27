const express = require('express');
//controllers
const {
    getAllReviews,
    getReviewById,
    createReview,
    updateReviewPatch,
    deleteReview

} = require('../controllers/reviews.controller.js');

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

router.get('/', protectAdmin, getAllReviews);

router.get('/:id', getReviewById);

router.post('/new-review', createReview);

router.patch('/', protectAccountOwner, updateReviewPatch);

router.delete('/', protectAccountOwner, deleteReview);


module.exports = { reviewsRouter: router };