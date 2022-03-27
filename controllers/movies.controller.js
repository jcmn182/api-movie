const { validationResult } = require('express-validator');

//Models
const {Movies} = require('../models/movies.model.js');
const {Actors} = require('../models/actors.model');
const { Posts } = require('../models/post.models.js');

// Utils
const { catchAsync } = require('../util/catchAsycn.js');
const { AppError } = require('../util/appError.js');
const { filterObj } = require('../util/filterObj.js');

exports.getAllMovies = catchAsync(async (req, res, next) => {
    
    const movies = await Movies.findAll({
        where: { status: 'active' },
        include: [ 
          { 
            model: Actors,
            attributes: [ 'name' ] 
          },
          { model: Posts} ]
      });

    res.status(200).json({
        status: 'success',
        data: { movies }
      });

});

exports.getMovieById = catchAsync(async (req, res, next) => {
  
    const { id } = req.params;

    const movie = await Movies.findOne({ where: { id },
      include: [ { 
        model: Actors,
        attributes: [ 'name' ] 
      }, 
      { model: Posts} ]
    });

    if (!movie) {
        return next(new AppError(404, 'Actor not found'));
    }

    res.status(200).json({
        status: 'success',
        data: { movie }
    });

});

exports.createNewMovie = catchAsync(async (req, res, next) => {

  const { tittle, description, duration, img, genre } = req.body;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      const errorMsg = errors
        .array()
        .map(({ msg }) => msg)
        .join('. ');
      return next(new AppError(400, errorMsg));
    }

    const newMovie = await Movies.create({
        tittle,
        description,
        duration,
        img,
        genre
      });

    res.status(201).json({
        status: 'success',
        data: { newMovie }
      });

});

exports.updateMovie = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;
    const data = filterObj(req.body, 'tittle', 'description', 'duration', 'img', 'genre' ); 

    const movie = await Movies.findOne({
      where: { id: id, status: 'active' }
    });

    if (!movie) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update movie, invalid ID'
      });
      return;
    }

    await movie.update({ ...data }); 

    res.status(204).json({ status: 'success' });

});

exports.deleteMOvie = catchAsync(async (req, res, next) => {
  
    const { id } = req.params;

    const movie = await Movies.findOne({
      where: { id: id, status: 'active' }
    });

    if (!movie) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete movie, invalid ID'
      });
      return;
    }

    // Soft delete
    await movie.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });

});