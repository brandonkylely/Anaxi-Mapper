const express = require('express');
const router = express.Router();
const { Favorite } = require("../../models/index");
const auth = require("../../middleware/auth");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", auth, (req, res) => {
   
    //Find Favorite information inside Favorite Collection by Movie ID 

    Favorite.find({"locationId":  req.body.locationId })
        .exec(( err, favorite ) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, favoriteNumber: favorite.length })
        })


});


router.post("/favorited", auth, (req, res) => {
   
   // Find Favorite Information inside Favorite Collection by Movie Id , userFrom 
   Favorite.find({"locationId":  req.body.locationId , "userFrom": req.body.userFrom })
    .exec(( err, favorite) => {
        if(err) return res.status(400).send(err)

        //How can we know if I already favorite this movie or not ? 
        let result = false;
        if(favorite.length !== 0) {
            result = true
        }

        res.status(200).json({ success: true, favorited: result});

    })

});

router.post("/addToFavorite", auth, (req, res) => {
    
   // Save the information about the movie or Location Id in the Favorite Collection
    const favorite = new Favorite(req.body)
    
    favorite.save((err, doc) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({ success: true })
    })
});


router.post("/removeFromFavorite", auth, (req, res) => {
    
    Favorite.findOneAndDelete({locationId: req.body.locationId, userFrom: req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.status(400).json({ success: false, err})
        res.status(200).json({ success: true, doc})
    })

});

module.exports = router;