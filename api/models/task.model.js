const { DataTypes } = require('sequelize');

//utils
const {sequelize} = require('../util/dataBase.js');

const Task = sequelize.define('task',{

    id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	content: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING(10),
		allowNull: false,
		defaultValue: 'active',
	}
})

module.exports = { Task };