const { User } = require('../models/user.model.js');
const { Reviews } = require('../models/reviews.model.js')


const initModels = () => {
    // 1 User <----> M Reviews
    User.hasMany(Reviews);
    Reviews.belongsTo(User);
};
  
  module.exports = { initModels };
  