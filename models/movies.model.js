const { DataTypes } = require('sequelize');

//utils
const {sequelize} = require('../util/dataBase.js');

const Movies = sequelize.define('movies',{

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
		type: DataTypes.NUMBER(100),
		allowNull: false,
	},
	duration: {
		type:DataTypes.STRING(100),
		allowNull: false
	},
	raiting: {
		type:DataTypes.STRING(100),
		allowNull: false
    },
    img: {
		type:DataTypes.STRING(100),
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