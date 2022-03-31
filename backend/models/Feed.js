const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema({
  Comment: String,
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentedAt: Date,
});
const feedSchema = mongoose.Schema({
  Text: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  addedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  like: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [CommentSchema],
  image: {
    type: String,
    default:
      "https://guarded-shelf-88919.herokuapp.com/api/learner/avatar/defaultAvatar.svg",
  },
});

module.exports = mongoose.model("Feeds", feedSchema);
