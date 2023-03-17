const { Schema, Types, model } = require("mongoose");

const favoriteSchema = new mongoose.Schema(
{
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    locationId: {
        type: String,
    },
    locationName: {
        type: String,
    },
    locationType: {
        type: String,
    },
    locationImage: {
        type: String,
    },

}
);

const Favorite = model('favorite', favoriteSchema);

module.exports = Favorite;
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config');

// class Favorite extends Model {}

// Favorite.init(
//     {   id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         userId: {
//             type: String,
//         },
//         locationId: {
//             type: String,
//         },
//     },
//     {  
//         sequelize,
//         freezeTableName: true,
//         modelName: 'favorite'
//     }
// );

// module.exports = Favorite;
