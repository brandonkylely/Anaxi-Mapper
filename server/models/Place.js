const { Schema, Types, model } = require("mongoose");

const addressComponentSchema = new mongoose.Schema({
  address_components: {
    long_name: String,
    short_name: String,
    types: [String],
  },
});

const latLngLiteralSchema = new mongoose.Schema({
  latLngLiteral: {
    lat: Number,
    lat: Number,
  },
});

//not sure which is right for the latLngLiteralSchema
// const latLngLiteralSchema = new mongoose.Schema({
//   latLngLiteral: {
//     lat: Number,
//     lng: Number,
//   },
// });

const boundsSchema = new mongoose.Schema({
  bounds: {
    northeast: latLngLiteralSchema,
    southwest: latLngLiteralSchema,
  },
});

const geometrySchema = new mongoose.Schema({
  geometry: {
    location: latLngLiteralSchema,
    viewport: boundsSchema,
  },
});

const openingHoursSchema = new mongoose.Schema({
  opening_hours: {
    open_now: Boolean,
    periods: {
      //might want to make this its own sub schema - 'PlaceOpeningHoursPeriod'
      open: openingHoursPeriodDetailSchema,
      close: openingHoursPeriodDetailSchema,
    },
    weekday_text: [String], //An array of strings describing in human-readable text the hours of the place.
  },
});

const openingHoursPeriodDetailSchema = new mongoose.Schema({
  opening_hours_period_detail: {
    //PlaceOpeningHoursPeriodDetail
    day: Number, //expressed as 0 through 6 with 0 being sunday, 1 being monday, etc.
    time: String, //May contain a time of day in 24-hour hhmm format. Values are in the range 0000–2359. The time will be reported in the location's time zone.
    date: String,
    truncated: Boolean,
  },
});

const photoSchema = new mongoose.Schema({
  //all required
  photos: {
    height: Number,
    html_attributions: [String],
    photo_reference: String,
    width: Number,
  },
});

const reviewSchema = new mongoose.Schema({
  reviews: {
    author_name: String, //required
    author_url: String,
    language: String,
    profile_photo_url: String,
    rating: Number, //required
    relative_time_description: String, //required
    text: String,
    time: Number, //required
  },
});

//might want to change to plusCodeSchema
const plus_codeSchema = new mongoose.Schema({
  plus_code: {
    compound_code: String,
    global_code: String, //required
  },
});

const placeEditorialSummarySchema = new mongoose.Schema({
  //need to finalize how this, placeEditorialSummary, PlaceOpeningHoursPeriodDetail and latLngLiteral will be formatted
  place_editorial_summary: {
    language: String,
    overview: String,
  },
});

const placeSchema = new mongoose.Schema({
  addToFavorites: { type: boolean, default: false},
  address_components: {type : addressComponentSchema},
  adr_address: String,
  business_status: String, //some sort of filtering to exclude permanently closed businesses, can be OPERATIONAL, CLOSED_TEMPORARILY, and CLOSED_PERMANENTLY
  curbside_pickup: Boolean,
  current_opening_hours: Boolean,
  delivery: Boolean,
  dine_in: Boolean,
  editorial_summary: placeEditorialSummarySchema,
  formatted_address: String,
  formatted_phone_number: String,
  geometry: geometrySchema,
  icon: String,
  icon_background_color: String,
  icon_mask_base_uri: String,
  international_phone_number: String,
  name: String,
  opening_hours: openingHoursSchema,
  // permanently_closed: Boolean, //depreciated
  photos: photoSchema,
  place_id: String,
  plus_code: plus_codeSchema,
  price_level: Number, //can be 0, 1, 2, 3, or 4 with 0 being free and 4 being very expensive
  rating: Number, //Contains the place's rating, from 1.0 to 5.0, based on aggregated user reviews.
  reviews: reviewSchema,
  types: [String], //should consider filtering out all Table 2 place types, and only keeping the ones in Table 1
  url: String,
  user_ratings_total: Number,
  utc_offset: Number,
  vicinity: String,
  website: String,
  wheelchair_accessible: Boolean,
});

//keepInFavorites Toggle Method

placeSchema.methods.addToFavorites = function () { //these are used to assist the nearbysearch methods
  this.addToFavorites = true;
};

placeSchema.methods.removeFromFavorites = function () {//these are used to assist the nearbysearch methods
  this.addToFavorites = false;
};

placeSchema.methods.changeFavorites = function () { //this is used when the user is selecting or deselecting indivdual places
  this.addToFavorites = !this.addToFavorites;
};

const Place = model("place", placeSchema);
module.exports = Place;

//saving this in case making too many subdocuments complicates the schema
//const openingHoursSchema = new mongoose.Schema({
//   opening_hours: {
//     open_now: Boolean,
//     periods: { //might want to make this its own sub schema - 'PlaceOpeningHoursPeriod'
//       open: { //might want to make this its own sub schema - 'PlaceOpeningHoursPeriodDetail' --required
//         day: Number,
//         time: String,
//       },
//       close: { //same as open, just not required
//         day: Number,
//         time: String,
//       },
//     },
//     weekday_text: { type: [string] },
//   },
// });

// const geometrySchema = new mongoose.Schema({
//   geometry: {
//     location: {
//       lat: Number,
//       lng: Number,
//     },
//     viewport: {
//       northeast: {
//         lat: Number,
//         lng: Number,
//       },
//       southwest: {
//         lat: Number,
//         lng: Number,
//       },
//     },
//   },
// });
