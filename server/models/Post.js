const { Schema, Types, model } = require("mongoose");

const postSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Post = model("post", postSchema);

module.exports = Post;
