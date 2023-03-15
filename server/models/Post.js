const { Schema, Types, model } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config');

// class Post extends Model {}

// Post.init(
//   {
//     title: DataTypes.STRING,
//     body: DataTypes.STRING
//   },
//   {
//     sequelize,
//     freezeTableName: true,
//     modelName: 'post'
//   }
// );

// module.exports = Post;