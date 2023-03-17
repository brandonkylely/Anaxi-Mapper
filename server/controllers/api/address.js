const express = require('express');
const router = express.Router();
const { Address } = require("../../models/index");
const auth = require("../../middleware/auth");

router.post("/search", auth, (req, res) => {

    const address = new Address(req.body)

    comment.save((err, comment) => {
        console.log(err)
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})