//Models
const { Actors } = require('../models/actors.model.js');
const { Movies } = require('../models/movies.model.js')

// Utils
const { catchAsync } = require('../util/catchAsycn.js');
 
exports.getAllActors = catchAsync(async (req, res, next) => {
    
    const actors = await Actors.findAll({
        where: { status: 'active' },
        include: [
          {
            model: Movies,
            include: [
              {
                model: Actors,
              }
            ]
          },
        ]
      });

    res.status(200).json({
        status: 'success',
        data: { actors }
      });
 
});

exports.getActorById = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const actor = await Actors.findOne({ where: { id } });

    if (!actor) {
        return next(new AppError(404, 'Actor not found'));
    }

    res.status(200).json({
        status: 'success',
        data: { actor }
    });

});

exports.createNewActor = catchAsync(async (req, res, next) => {
    
    const {name, country, age, profilePick} = req.body;

    if (!name || !country || !age || !profilePick) {
        return next(
          new AppError(400, 'Must provide a valid name, email and password')
        );
      }

    const newActor = await User.create({
        name,
        country,
        age,
        profilePick
      });

    res.status(201).json({
        status: 'success',
        data: { newActor }
      });

});

exports.updateActor = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;
    const data = filterObj(req.body, 'name', 'country'); // { title } | { title, author } | { content }

    const actor = await Actors.findOne({
      where: { id: id, status: 'active' }
    });

    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update actor, invalid ID'
      });
      return;
    }

    await actor.update({ ...data }); // .update({ title, author })

    res.status(204).json({ status: 'success' });

});

exports.deleteActor = catchAsync(async (req, res, next) => {
   
    const { id } = req.params;

    const actor = await Actors.findOne({
      where: { id: id, status: 'active' }
    });

    if (!actor) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete actor, invalid ID'
      });
      return;
    }

    // Soft delete
    await actor.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });

});