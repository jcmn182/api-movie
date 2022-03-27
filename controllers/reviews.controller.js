// Models
const { Posts } = require('../models/post.models.js');
const { Users } = require('../models/user.model.js');

// Utils
const { filterObj } = require('../util/filterObj.js');
const { catchAsync } = require('../util/catchAsycn.js');
const { AppError } = require('../util/appError.js');



exports.getAllReviews = catchAsync(async (req, res, next) => {
  
  const post = await Posts.findAll({
    where: { status: 'active' },
    include: [
      { model: Users, attributes: { exclude: ['password'] } },
    ]
  });

  res.status(200).json({
    status: 'success',
    data: { post }
  });
});

// Get post by id
exports.getReviewById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  
  const post = await Posts.findOne({
    where: { id: id, status: 'active' }
  });

  if (!post) {
    return next(new AppError(404, 'No post found with the given ID'));
  }

  res.status(200).json({
    status: 'success',
    data: {
        post
    }
  });
});

// Save post to database
exports.createReview = catchAsync(async (req, res, next) => {

  const { tittle, comment, movieId,  } = req.body;

  const { currentUser } = req;


  if (!tittle || !comment || !movieId) {
    return next(new AppError(400, 'Must provide a valid title and content'));
  }
  // INSERT INTO posts (title, content, userId) VALUES ('A new post', 'Saved in db', 1)
  const newpost = await Posts.create({
    tittle, 
    comment,
    userId:currentUser.id,
    movieId
  });

  res.status(201).json({
    status: 'success',
    data: { newpost }
  });
});

// Update post (patch)
exports.updateReviewPatch = catchAsync(async (req, res, next) => {
  
    const { id } = req.params;
    const data = filterObj(req.body, 'tittle', 'comment'); // { title } | { title, author } | { content }

    const post = await Posts.findOne({
      where: { id: id, status: 'active' }
    });

    if (!post) {
      return next(new AppError(400, 'Cant update post, invalid ID'));
    }

    await review.update({ ...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });
  
});

// Delete post
exports.deleteReview = catchAsync(async (req, res, next) => {
  
    const { id } = req.params;

    const post = await Posts.findOne({
      where: { id: id, status: 'active' }
    });

    if (!post) {
      return next(new AppError(400, 'Cant delete post, invalid ID'));
    }

    // DELETE FROM posts WHERE id = 1;
    // await post.destroy();

    // Soft delete
    await post.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  
});
