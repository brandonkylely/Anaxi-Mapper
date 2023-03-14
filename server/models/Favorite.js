
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Favorite extends Model {}

Favorite.init(
    {   id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: String,
        },
        locationId: {
            type: String,
        },
    },
    {  
        sequelize,
        freezeTableName: true,
        modelName: 'favorite'
    }
);

module.exports = Favorite;
