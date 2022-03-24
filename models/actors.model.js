const { DataTypes } = require('sequelize');

//utils
const {db} = require('../util/dataBase.js');

const Actors = db.define('actors', {

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
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	profilePick: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	status: {
		type: DataTypes.STRING(10),
		defaultValue: 'active',
		allowNull: false
	}
})

module.exports = { Actors };