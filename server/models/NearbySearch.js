const { Schema, Types, model } = require("mongoose");
import Place from "./Place";

const nearbySearchSchema = new Schema({
    places: [Place],
});

nearbySearchSchema.method.addAllToFavorites = function () { //these are called when users want to toggle the default on or off for an entire nearbySearch Result
    this.places.forEach((place) => {
        place.addToFavorites();
    });
};

nearbySearchSchema.method.removeAllFromFavorites = function () { //these are called when users want to toggle the default on or off
    this.places.forEach((place) => {
        place.removeFromFavorites();
    });
};

const NearbySearch = model("NearbySearch", nearbySearchSchema);

module.exports = NearbySearch;

//

//User
//user has a favorites list of nearby seraches
//those nearbysearches have a bunch of places

//do initial filtering before nearby search call

//filter out undesired results

//finalized / favorited nearby search result is then saved to their favorites list



//user will options for every place type to be included in their search
//user will give initial address
//user will select range

//8 different restaurnts
//favorites


//fetch

// [places, place, place, ]

//addToFavorites is false be default
// button that switches the default, or goes through and automatically changes,
// there would also be an option where, depending on your default
//if you remove everything from favorites by default, you can go through and pick and choose what you want added
//if you keep everything by default, you can go through and pick and choose what you want gone