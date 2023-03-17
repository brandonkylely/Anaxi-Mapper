const express = require('express');
const router = express.Router();
const { Place } = require("../models/Place");
const { auth } = require("../middleware/auth");

router.post("/saveSearch", auth, (req, res) => {

    const comment = new Comment(req.body)

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