const { Schema, Types, model } = require("mongoose");

const favoriteSchema = new Schema({
    place_id: {
        type: String,
        ref: "address"
        
    },
    address: {
        type: String,
    },
});

const Favorite = model('favorite', favoriteSchema);
Favorite.createCollection().then(function (collection) {
    console.log("Favorite Collection is created!");
  });
module.exports = Favorite;

