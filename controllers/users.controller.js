//Models
const { Users } = require('../models/user.model.js');
const { Reviews } = require('../models/reviews.model.js');

// Utils
const { catchAsync } = require('../util/catchAsycn.js');
 
exports.getAllUsers = catchAsync(async (req, res, next) => {
  
    const users = await Users.findAll({
        where: { status: 'active' },
        include: [
          { model: Reviews },
        ]
      });

    res.status(200).json({
        status: 'success',
        data: { users }
      });

});

exports.getUserById = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;

    const user = await Users.findOne({ where: { id } });

    if (!user) {
        return next(new AppError(404, 'User not found'));
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });


});

exports.createNewUser = catchAsync(async (req, res, next) => {
  
    const {userName, email, password, role} = req.body;

    if (!userName || !email || !password || !role) {
        return next(
          new AppError(400, 'Must provide a valid values')
        );
      }

    const newUser = await User.create({
        userName,
        email,
        password,
        role
      });

    res.status(201).json({
        status: 'success',
        data: { newUser }
      });

});

exports.updateUser = catchAsync(async (req, res, next) => {
  
    const { id } = req.params;
    const data = filterObj( req.body, 'userName', 'email', 'password', 'role' ); // { title } | { title, author } | { content }

    const user = await Users.findOne({
      where: { id: id, status: 'active' }
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update user, invalid ID'
      });
      return;
    }

    await user.update({ ...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });


});

exports.deleteUser = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;

    const user = await Users.findOne({
      where: { id: id, status: 'active' }
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete user, invalid ID'
      });
      return;
    }

    // Soft delete
    await user.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });

});