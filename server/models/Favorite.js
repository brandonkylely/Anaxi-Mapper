const { Schema, Types, model } = require("mongoose");

const favoriteSchema = new Schema(
{
    
    place_id: {
        type: String,
        ref: 'place'
    },
    address: {
        type: String,
        ref: 'address'
    },
}
);

const Favorite = model('favorite', favoriteSchema);

module.exports = Favorite;

