const { Schema, Types, model } = require("mongoose");
import Place from "./Place";

const nearbySearchSchema = new Schema({
  places: [Place], //might want to change this back later
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

// accounting
// airport
// amusement_park
// aquarium
// art_gallery
// atm
// bakery
// bank
// bar
// beauty_salon
// bicycle_store
// book_store
// bowling_alley
// bus_station
// cafe
// campground
// car_dealer
// car_rental
// car_repair
// car_wash
// casino
// cemetery
// church
// city_hall
// clothing_store
// convenience_store
// courthouse
// dentist
// department_store
// doctor
// drugstore
// electrician
// electronics_store
// embassy
// fire_station
// florist
// funeral_home
// furniture_store
// gas_station
// gym
// hair_care
// hardware_store
// hindu_temple
// home_goods_store
// hospital
// insurance_agency
// jewelry_store
// laundry
// lawyer
// library
// light_rail_station
// liquor_store
// local_government_office
// locksmith
// lodging
// meal_delivery
// meal_takeaway
// mosque
// movie_rental
// movie_theater
// moving_company
// museum
// night_club
// painter
// park
// parking
// pet_store
// pharmacy
// physiotherapist
// plumber
// police
// post_office
// primary_school
// real_estate_agency
// restaurant
// roofing_contractor
// rv_park
// school
// secondary_school
// shoe_store
// shopping_mall
// spa
// stadium
// storage
// store
// subway_station
// supermarket
// synagogue
// taxi_stand
// tourist_attraction
// train_station
// transit_station
// travel_agency
// university
// veterinary_care
// zoo
