const { DataTypes } = require('sequelize');

//utils
const {sequelize} = require('../util/dataBase.js');

const Actors = sequelize.define('actors',{

    id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING(100),
		allowNull: false
	},
	raiting: {
		type: DataTypes.STRING(10),
		allowNull: false
	},
	age: {
		type: DataTypes.STRING(10),
		allowNull: false
	},
	profilePick: {
		type: DataTypes.STRING(10),
		allowNull: false
	},
	status: {
		type: DataTypes.STRING(10),
		allowNull: false
	}
})

module.exports = { Actors };