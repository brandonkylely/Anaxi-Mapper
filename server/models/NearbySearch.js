const { Schema, Types, model } = require("mongoose");

const nearbySearchSchema = new Schema({
  places: [{ type: Schema.Types.ObjectId, ref: "place" }], //might want to change this back later
  //[{ type: Schema.Types.ObjectId, ref: "Place" }]
});

nearbySearchSchema.method.addAllToFavorites = function () {
  //these are called when users want to toggle the default on or off for an entire nearbySearch Result
  this.places.forEach((place) => {
    place.addToFavorites();
  });
};

nearbySearchSchema.method.removeAllFromFavorites = function () {
  //these are called when users want to toggle the default on or off
  this.places.forEach((place) => {
    place.removeFromFavorites();
  });
};

const NearbySearch = model("nearbySearch", nearbySearchSchema);

module.exports = NearbySearch;
