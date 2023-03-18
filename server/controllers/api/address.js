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
      // return res.json(data)
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

      //hard coding keyword, radius, and type for now
      const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${newAddress.coords.lat},${newAddress.coords.lng}&radius=10000&type=restaurant&keyword=&key=${process.env.apiKey}`;
      //send full res at the end
      // res.json(googleData.results[0].geometry.location);
      const nearbyRes = await fetch(nearbyUrl);
      const nearbyData = await nearbyRes.json();
      // console.log("req url 2", nearbyUrl);
      // console.log('nearbyData',nearbyData)
      const returnObject = {
        coords: newAddress.coords,
        nearbySearch: nearbyData.results,
      }
      console.log("newAddres.coords", newAddress.coords);
      const newPlace = await Place.create(nearbyData.results[0]);
      res.json(newAddress.coords);
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

module.exports = router;
