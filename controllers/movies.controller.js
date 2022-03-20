//Models
const {Movies} = require('../models/movies.model.js');
const {Actors} = require('../models/actors.model');
const { Reviews } = require('../models/reviews.model.js')

// Utils
const { catchAsync } = require('../util/catchAsycn.js');
 
exports.getAllMovies = catchAsync(async (req, res, next) => {
    
    const movies = await Movies.findAll({
        where: { status: 'active' },
        include: [ { model: Actors,}, { model: Reviews,} ]
      });

    res.status(200).json({
        status: 'success',
        data: { movies }
      });

});

exports.getMovieById = catchAsync(async (req, res, next) => {
  
    const { id } = req.params;

    const movie = await Movies.findOne({ where: { id } });

    if (!movie) {
        return next(new AppError(404, 'Actor not found'));
    }

    res.status(200).json({
        status: 'success',
        data: { movie }
    });

});

exports.createNewMovie = catchAsync(async (req, res, next) => {
  
    const {tittle, description, duration, img, genre} = req.body;

    if (!tittle || !description || !duration || !img  || !genre) {
        return next(
          new AppError(400, 'Must provide a valid values')
        );
      }

    const newMovie = await User.create({
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
    const data = filterObj(req.body, 'tittle', 'description', 'duration', 'img', 'genre' ); // { title } | { title, author } | { content }

    const actor = await Actors.findOne({
      where: { id: id, status: 'active' }
    });

    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update movie, invalid ID'
      });
      return;
    }

    await actor.update({ ...data }); // .update({ title, author })

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