const { Schema, Types, model } = require("mongoose");

const commentSchema =  new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }, 
    postId: {
        type: String,
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String
    }

});


const Comment = model('comment', commentSchema);

module.exports = Comment;
