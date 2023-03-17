const express = require('express');
const router = express.Router();
const { Address } = require("../../models/index");
const auth = require("../../middleware/auth");

router.post("/search", auth, (req, res) => {

    const address = new Address(req.body)

    address.save((err, address) => {
        console.log(err)
        if (err) return res.json({ success: false, err })

        Address.find({ '_id': address._id })
            // .populate('address')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})