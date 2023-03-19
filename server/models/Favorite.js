const { Schema, Types, model } = require("mongoose");

const favoriteSchema = new Schema(
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
    // addresses: [list]

}
);

const Favorite = model('favorite', favoriteSchema);

module.exports = Favorite;

