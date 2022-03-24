const { DataTypes } = require('sequelize');

//utils
const {db} = require('../util/dataBase.js');

const Reviews = db.define('reviews',{

    id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	tittle: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	comment: {
		type: DataTypes.STRING(255),
		allowNull: false
	  },
	raiting: {
		type: DataTypes.INTEGER,
		allowNull: false
      },
    userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
    },
    movieId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING(10),
		defaultValue: 'active',
		allowNull: false
	  }
})

module.exports = { Reviews };