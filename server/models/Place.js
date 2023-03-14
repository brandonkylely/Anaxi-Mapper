const { Schema, Types, model } = require("mongoose");

const addressComponentSchema = new mongoose.Schema({
  address_components: {
    long_name: { type: string },
    short_name: { type: string },
    types: { type: [string] },
  },
});

const latLngLiteralSchema = new mongoose.Schema({
  latLngLiteral: {
    lat: { type: number },
    lat: { type: number },
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
    open_now: { type: boolean },
    periods: {
      //might want to make this its own sub schema - 'PlaceOpeningHoursPeriod'
      open: openingHoursPeriodDetailSchema,
      close: openingHoursPeriodDetailSchema,
    },
    weekday_text: { type: [string] }, //An array of strings describing in human-readable text the hours of the place.
  },
});

const openingHoursPeriodDetailSchema = new mongoose.Schema({
  opening_hours_period_detail: {
    //PlaceOpeningHoursPeriodDetail
    day: { type: number }, //expressed as 0 through 6 with 0 being sunday, 1 being monday, etc.
    time: { type: string }, //May contain a time of day in 24-hour hhmm format. Values are in the range 0000–2359. The time will be reported in the location's time zone.
    date: { type: string },
    truncated: { type: boolean },
  },
});

const photoSchema = new mongoose.Schema({
  //all required
  photos: {
    height: { type: number },
    html_attributions: { type: [string] },
    photo_reference: { type: string },
    width: { type: number },
  },
});

const reviewSchema = new mongoose.Schema({
  reviews: {
    author_name: { type: string }, //required
    author_url: { type: string },
    language: { type: string },
    profile_photo_url: { type: string },
    rating: { type: number }, //required
    relative_time_description: { type: string }, //required
    text: { type: string },
    time: { type: number }, //required
  },
});

//might want to change to plusCodeSchema
const plus_codeSchema = new mongoose.Schema({
  plus_code: {
    compound_code: { type: string },
    global_code: { type: string }, //required
  },
});

const placeEditorialSummarySchema = new mongoose.Schema({
  //need to finalize how this, placeEditorialSummary, PlaceOpeningHoursPeriodDetail and latLngLiteral will be formatted
  place_editorial_summary: {
    language: { type: string },
    overview: { type: string },
  },
});

const placeSchema = new mongoose.Schema({
  addToFavorites: { type: boolean, default: false},
  address_components: addressComponentSchema,
  adr_address: { type: string },
  business_status: { type: string }, //some sort of filtering to exclude permanently closed businesses, can be OPERATIONAL, CLOSED_TEMPORARILY, and CLOSED_PERMANENTLY
  curbside_pickup: { type: boolean },
  current_opening_hours: { type: boolean },
  delivery: { type: boolean },
  dine_in: { type: boolean },
  editorial_summary: placeEditorialSummarySchema,
  formatted_address: { type: string },
  formatted_phone_number: { type: string },
  geometry: geometrySchema,
  icon: { type: string },
  icon_background_color: { type: string },
  icon_mask_base_uri: { type: string },
  international_phone_number: { type: string },
  name: { type: string },
  opening_hours: openingHoursSchema,
  // permanently_closed: { type: boolean }, //depreciated
  photos: photoSchema,
  place_id: { type: string },
  plus_code: plus_codeSchema,
  price_level: { type: number }, //can be 0, 1, 2, 3, or 4 with 0 being free and 4 being very expensive
  rating: { type: number }, //Contains the place's rating, from 1.0 to 5.0, based on aggregated user reviews.
  reviews: reviewSchema,
  types: { type: [string] }, //should consider filtering out all Table 2 place types, and only keeping the ones in Table 1
  url: { type: string },
  user_ratings_total: { type: number },
  utc_offset: { type: number },
  vicinity: { type: string },
  website: { type: string },
  wheelchair_accessible: { type: boolean },
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

const Place = model("Place", placeSchema);
module.exports = Place;

//saving this in case making too many subdocuments complicates the schema
//const openingHoursSchema = new mongoose.Schema({
//   opening_hours: {
//     open_now: { type: boolean },
//     periods: { //might want to make this its own sub schema - 'PlaceOpeningHoursPeriod'
//       open: { //might want to make this its own sub schema - 'PlaceOpeningHoursPeriodDetail' --required
//         day: { type: number },
//         time: { type: string },
//       },
//       close: { //same as open, just not required
//         day: { type: number },
//         time: { type: string },
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
