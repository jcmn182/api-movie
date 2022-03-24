const { DataTypes } = require('sequelize');

//utils
const { db } = require('../util/dataBase.js');

const ActorsInMovies = db.define('actorsInMovies',{

    id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
    actorId: {
		type: DataTypes.INTEGER,
		allowNull: false,
    },
    movieId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	}
})

module.exports = { ActorsInMovies };