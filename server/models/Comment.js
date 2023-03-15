const { Schema, Types, model } = require("mongoose");

const commentSchema =  new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    postId: {
        type: String,
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }

});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config');

// class Comment extends Model {}
// Comment.init(
//   {
//     body: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   },
//   {
//     sequelize,
//     freezeTableName: true,
//     modelName: 'comment'
//   }
// );

// module.exports = Comment;