const express = require("express");
const router = express.Router();
const { Favorite } = require("../../models/index");
const auth = require("../../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const googleData = await googleRes.json();
    const data = googleData.results[0];
    const favorite = await Favorite.create({
      post_id: data.post_id,
      address: data.formatted_address,
    //category: data.types[0],
    });
    res.status(200).json({ success: true, favorite });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});

router.post("/favoriteNumber", auth, async (req, res) => {
  try {
    const favNumber = await Favorite.find();
    res.status(200).json({ success: true, favoriteNumber: favNumber.length });
    console.log(favNumber);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});

router.post("/favorited", auth, async (req, res) => {
  try {
    const favorited = await Favorite.find({
      post_id: req.body.post_id,
      _id: req.body._id,
    });
    let result = false;
    if (favorited.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
    console.log(favorited);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});

router.post("/addToFavorite", auth, async (req, res) => {
  try {
    // Save the information about the location in the Favorite Collection
    // const favorite = await Favorite.find();
    const favorite = await Favorite.create({
      ...req.body,
    });
    res.status(200).json({ success: true, favorite });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});

// router.post("/updateFavorite", auth, async (req, res) => {
//     try {
//         const updateFav = await Favorite.findAndUpdate({post_id: req.body.post_id, _id: req.body._id });
//         res.status(200).json({ success: true, updateFav });
//         console.log(updateFav);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ success: false, err });
//     }
// });

router.post("/removeFromFavorite", auth, async (req, res) => {
  try {
    const deleteFav = await Favorite.findOneAndDelete({
      ...req.body});
    res.status(200).json({ success: true });
    console.log(deleteFav);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
});

router.post("/getFavoritePlaces", auth, async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json({ success: true, favorites });
    console.log(favorites);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }
});

module.exports = router;