const { User } = require('../models/user.model.js');
const { Reviews } = require('../models/reviews.model.js');
const { Movies } = require('../models/movies.model.js');


const initModels = () => {
    // 1 User <----> M Reviews
    User.hasMany(Reviews);
    Reviews.belongsTo(User);

     // 1 Movie <--> M Review
    Movies.hasMany(Reviews);
    Reviews.belongsTo(Movies);

    // M Movie <--> M Actor
    Movies.belongsToMany(Actor, { through: ActorsInMovies });
    Actor.belongsToMany(Movie, { through: ActorsInMovies });
};
  
  module.exports = { initModels };
  