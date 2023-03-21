const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { Comment } = require("../../models/index");

router.post("/createComment", auth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            commentText: req.body.commentText,
            post_id: Date.now(),
        });
        res.json({ success: true, newComment});
        console.log("i made a comment", newComment);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.error(error);
    }
});

router.post("/getComments", auth, async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json({ success: true, comments});
        console.log("i got comments", comments);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.error(error);
    }
});


module.exports = router;