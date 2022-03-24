const { DataTypes } = require('sequelize');

//utils
const { db } = require('../util/dataBase.js');

const Movies = db.define('movies',{

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
    description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	duration: {
		type:DataTypes.INTEGER,
		allowNull: false
	},
	raiting: {
		type:DataTypes.INTEGER,
    },
    img: {
		type:DataTypes.STRING(1000),
		allowNull: false
    },
    genre: {
		type:DataTypes.STRING(100),
		allowNull: false
    },
	status: {
		type: DataTypes.STRING(10),
		defaultValue: 'active',
		allowNull: false
	}
})

module.exports = { Movies };