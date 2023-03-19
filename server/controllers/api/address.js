require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { Address, Place } = require("../../models/index");
const auth = require("../../middleware/auth");

router.post("/search", auth, async (req, res) => {
  const returnValue = {
    validAddress: false,
    newAddress: {},
  }
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
    res.json(returnValue)
  } catch (err) {
    console.log(err);
    res.json({ success: false, data: null });
  }
});

router.post("/nearby", auth, async (req, res) => {
  const returnValue = {
    validAddress: false,
    newAddress: [],
  }
  try {
    const parameters = req.body.userParams
    const coords = parameters.coordinate
    // const type = parameters.type;
    // const radius = parameters.radius;
    // const keyword = parameters.keyword;

    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=${parameters.radius}&type=${parameters.type}&keyword=${parameters.keyword}&key=${process.env.apiKey}`;
    const nearbyRes = await fetch(nearbyUrl);
    const nearbyData = await nearbyRes.json();
   
    console.log("nearbyData.results", nearbyData.results);
    //put here what we want to log in the database:
    // const newPlace = await Place.create(nearbyData.results);
    res.json(nearbyData.results);
  }
  catch (err) {
    console.log(err);
    res.json( {success: false, data: null})
  }
});
module.exports = router;
