const { DataTypes } = require('sequelize');

//utils
const {sequelize} = require('../util/dataBase.js');

const User = sequelize.define('user',{

    id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	userName: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(100),
		unique: true,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false
	  },
	status: {
		type: DataTypes.STRING(10),
		defaultValue: 'active',
		allowNull: false
	  },
	role: {
		type: DataTypes.STRING(10),
		allowNull: false
	  }
})

module.exports = { User };