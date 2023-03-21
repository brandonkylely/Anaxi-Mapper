require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { Address, Place } = require("../../models/index");
const auth = require("../../middleware/auth");
const place_types = {
  1: "accounting",
  2: "airport",
  3: "amusement_park",
  4: "aquarium",
  5: "art_gallery",
  6: "atm",
  7: "bakery",
  8: "bank",
  9: "bar",
  10: "beauty_salon",
  11: "bicycle_store",
  12: "book_store",
  13: "bowling_alley",
  14: "bus_station",
  15: "cafe",
  16: "campground",
  17: "car_dealer",
  18: "car_rental",
  19: "car_repair",
  20: "car_wash",
  21: "casino",
  22: "cemetery",
  23: "church",
  24: "city_hall",
  25: "clothing_store",
  26: "convenience_store",
  27: "courthouse",
  28: "dentist",
  29: "department_store",
  30: "doctor",
  31: "drugstore",
  32: "electrician",
  33: "electronics_store",
  34: "embassy",
  35: "fire_station",
  36: "florist",
  37: "funeral_home",
  38: "furniture_store",
  39: "gas_station",
  40: "gym",
  41: "hair_care",
  42: "hardware_store",
  43: "hindu_temple",
  44: "home_goods_store",
  45: "hospital",
  46: "insurance_agency",
  47: "jewelry_store",
  48: "laundry",
  49: "lawyer",
  50: "library",
  51: "light_rail_station",
  52: "liquor_store",
  53: "local_government_office",
  54: "locksmith",
  55: "lodging",
  56: "meal_delivery",
  57: "meal_takeaway",
  58: "mosque",
  59: "movie_rental",
  60: "movie_theater",
  61: "moving_company",
  62: "museum",
  63: "night_club",
  64: "painter",
  65: "park",
  66: "parking",
  67: "pet_store",
  68: "pharmacy",
  69: "physiotherapist",
  70: "plumber",
  71: "police",
  72: "post_office",
  73: "primary_school",
  74: "real_estate_agency",
  75: "restaurant",
  76: "roofing_contractor",
  77: "rv_park",
  78: "school",
  79: "secondary_school",
  80: "shoe_store",
  81: "shopping_mall",
  82: "spa",
  83: "stadium",
  84: "storage",
  85: "store",
  86: "subway_station",
  87: "supermarket",
  88: "synagogue",
  89: "taxi_stand",
  90: "tourist_attraction",
  91: "train_station",
  92: "transit_station",
  93: "travel_agency",
  94: "university",
  95: "veterinary_care",
  96: "zoo",
};

router.post("/search", auth, async (req, res) => {
  const returnValue = {
    validAddress: false,
    newAddress: {},
  };
  try {
    console.log("reqbody", req.body);
    const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.userAddress.replace(
      " ",
      "+"
    )}&key=${process.env.apiKey}`;
    const googleRes = await fetch(requestUrl);
    const googleData = await googleRes.json();
    console.log("req url ", requestUrl);
    console.log("googleData", googleData);
    console.log("googleData.results?.length", googleData.results?.length);
    //error handling for bad address
    if (googleData && googleData.results?.length) {
      const { address_components, types, ...data } = googleData.results[0];
      //if the geo code found an address, set this to true,
      returnValue.validAddress = true;
      console.log("YOUR DATA", data);

      const newAddress = await Address.create({
        address: data.formatted_address,
        coords: {
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng,
        },
        place_id: data.place_id,
      });
      returnValue.newAddress = newAddress;

      return res.json(returnValue);
    }
    //returns the return value with validAddress property set to false
    res.json(returnValue);
  } catch (err) {
    console.log(err);
    res.json({ success: false, data: null });
  }
});

router.post("/nearby", auth, async (req, res) => {
  const returnValue = {
    validParams: false,
    moreResults: false,
    searchResults: "",
  };
  try {
    const parameters = req.body.userParams;
    const coords = parameters.coordinate;
    console.log("reqbody", req.body);
    const typeIds = parameters.type;
    //reqbody {
    //userParams: {
    //type: '',
    //radius: '5000',
    //keyword: '',
    //coordinate: { lat: 33.8820632, lng: -78.5183816 }
    //}

    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=${parameters.radius}&type=${parameters.type}&keyword=${parameters.keyword}&key=${process.env.apiKey}`;
    const nearbyRes = await fetch(nearbyUrl);
    const nearbyData = await nearbyRes.json();


    //checks to see if given parameters returns anything
    if (nearbyData.results.length > 0) {
      returnValue.validParams = true;
    }

    //sort out type [locality, political] from nearbyData.results
    const filteredResults = nearbyData.results.filter((result) => {
      return result.types[0] !== "locality" && result.types[0] !== "political";
    });
    
    if (nearbyData.next_page_token) {
      returnValue.moreResults = nearbyData.next_page_token;
      // const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=${parameters.radius}&type=${parameters.type}&keyword=${parameters.keyword}&key=${process.env.apiKey}`;
    }
    returnValue.searchResults = filteredResults;

    //filtered results take out any political / locality results, these are cities
    res.json(returnValue);
  } catch (err) {
    console.log(err);
    res.json({ success: false, data: null });
  }
});
module.exports = router;
