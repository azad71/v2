const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    content: {
      type: String,
    },

    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },

        text: {
          type: String,
          required: true,
        },

        name: {
          type: String,
        },

        image: {
          type: String,
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
