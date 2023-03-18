require("dotenv").config();
const express = require('express');
const router = express.Router();
const fetch = require("node-fetch")
// const { Address } = require("../../models/index");
const auth = require("../../middleware/auth");



router.post("/search", auth, async (req, res) => {
  try {
    console.log("reqbody", req.body)
    const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.userAddress.replace(" ", "+")}&key=${process.env.apiKey}`;
    const googleRes = await fetch(requestUrl);
    const googleData = await googleRes.json();
    console.log("req url ", requestUrl);
    console.log('googleData',googleData)
    console.log('googleData.results?.length', googleData.results?.length)
    if (googleData && googleData.results?.length) {
      const { address_components, types, ...data } = googleData.results[0]
      // return res.json(data)
      console.log("YOUR DATA", data)
      
      // TODO - take data and use to make second api call...


      //send full res at the end
      res.json(googleData.results[0].geometry.location)
    };
    // res.json({ success: false, data: null })
  } catch (err) {
    console.log(err);
    res.json({ success: false, data: null })
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
})



module.exports = router;
