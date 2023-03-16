const router = require("express").Router();
const Place = require("../../models/Place");
const NearbySearch = require("../../models/NearbySearch");

router.post()

const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`;