const { Schema, Types, model } = require("mongoose");

const commentSchema =  new Schema({
    commentText: String,
    post_id: String,
});


const Comment = model('comment', commentSchema);

Comment.createCollection().then(function (collection) {
    console.log("Comment Collection is created!");
    });


module.exports = Comment;
