const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');


const favoriteSchema = new Schema(
{
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

const Favorite = model('Favorite', favoriteSchema);

module.exports = Favorite;
