const { Users } = require('../models/user.model.js');
const { Posts } = require('../models/post.models.js');
const { Movies } = require('../models/movies.model.js');
const { Actors } = require('../models/actors.model.js');
const { ActorsInMovies } = require('../models/actorsInMovie.model.js');


const initModels = () => {
    // 1 User <----> M Reviews
    Users.hasMany(Posts);
    Posts.belongsTo(Users);

     // 1 Movie <--> M Review
    Movies.hasMany(Posts);
    Posts.belongsTo(Movies);

    // M Movie <--> M Actor
    Movies.belongsToMany(Actors, { through: ActorsInMovies });
    Actors.belongsToMany(Movies, { through: ActorsInMovies });
};
  
  module.exports = { initModels };
  