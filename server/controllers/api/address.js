require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { Address, Place } = require("../../models/index");
const auth = require("../../middleware/auth");

router.post("/search", auth, async (req, res) => {
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
    if (googleData && googleData.results?.length) {
      const { address_components, types, ...data } = googleData.results[0];
      
      console.log("YOUR DATA", data);
      // TODO - take data and use to make second api call...
      const newAddress = await Address.create({
        address: data.formatted_address,
        coords: {
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng,
        },
        place_id: data.place_id,
      });
      return res.json(newAddress.coords);

      
    }
    // res.json({ success: false, data: null })
  } catch (err) {
    console.log(err);
    res.json({ success: false, data: null });
  }
  // const address = new Address(req.body)
  // console.log(address);
  // address.save((err, address) => {
  //     console.log(err)
  //     if (err) return res.json({ success: false, err })

  // Address.find({ '_id': address._id })
  //     // .populate('results')
  //     .exec((err, result) => {
  //         if (err) return res.json({ success: false, err })

  //     })
  // })
  //         return res.status(200).json({ success: true, result })
});

router.post("/nearby", auth, async (req, res) => {
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
