const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");

router.post("/createComment", auth, (req, res) => {
    try {
        const comment = new Comment({
            user: req.user._id,
            commentText: req.body.text,
        });
        comment.save();
        res.json({ success: true, data: comment });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get("/getComments", auth, (req, res) => {
    try {
        const comments = new Comment.find({ user: req.user._id });
        res.json({ success: true, data: comments });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;