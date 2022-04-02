const express = require("express");
const Feed = require("../models/Feed");
const Joi = require("@hapi/joi");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
var mongoose = require("mongoose");
const { findOneAndUpdate } = require("../models/Feed");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve();
    const localPath = `${uploadPath}/uploads/`;
    cb(null, localPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = {
  getAllFeeds: async (req, res) => {
    const feed = await Feed.find()
      .populate("addedBy")
      .populate("comments.commentBy")
      .sort({ addedAt: -1 });
    res.send(feed);
  },
  likeFeed: async (req, res) => {
    const { likedBy } = req.body;
    Feed.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likedBy: [likedBy] } },
      async function (err, response) {
        const feed = await Feed.findById(req.params.id)
          .populate("addedBy")
          .populate("comments.commentBy");
        res.send(feed);
      }
    );
  },
  dislikeFeed: async (req, res) => {
    const { dislikedBy } = req.body;
    Feed.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likedBy: dislikedBy } },
      async function (err, response) {
        const feed = await Feed.findById(req.params.id)
          .populate("addedBy")
          .populate("comments.commentBy");
        res.send(feed);
      }
    );
  },
  commentFeed: async (req, res) => {
    Feed.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: [{ ...req.body }] } },
      async function (err, response) {
        const feed = await Feed.findById(req.params.id)
          .populate("addedBy")
          .populate("comments.commentBy");
        res.send(feed);
      }
    );
  },
  addFeed: async (req, res) => {
    const { text, addedBy } = req.body;
    try {
      feed = new Feed({
        Text: text,
        addedBy: addedBy,
        image: req.file ? req.file.filename : "",
      });
      await feed.save();
      const feedd = await Feed.findById(feed._id)
        .populate("addedBy")
        .populate("comments.commentBy");
      res.send(feedd);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },
  editFeed: async (req, res) => {
    const { text } = req.body;
    try {
      const fed = {};
      fed.Text = text;
      if (req.file) {
        fed.image = req.file.filename;
      }
      Feed.findByIdAndUpdate(
        req.params.id,
        { $set: fed },
        { new: true },
        async function (err, response) {
          const feed = await Feed.findById(req.params.id)
            .populate("addedBy")
            .populate("comments.commentBy");
          res.send(feed);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  },

  deleteCommentFeed: async (req, res) => {
    const { commentid } = req.body;
    Feed.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { comments: { _id: commentid } } },
      async function (err, response) {
        const feed = await Feed.findById(req.params.id)
          .populate("addedBy")
          .populate("comments.commentBy");
        res.send(feed);
      }
    );
  },
  editComment: async (req, res) => {
    Feed.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { [`comments.$[outer].Comment`]: req.body.comment },
      },
      {
        arrayFilters: [{ "outer._id": req.body.commentId }],
      },
      async function (err, response) {
        const feed = await Feed.findById(req.params.id)
          .populate("addedBy")
          .populate("comments.commentBy");
        res.send(feed);
      }
    );
  },
  deleteFeed: async (req, res) => {
    const feed = await Feed.findByIdAndRemove(req.params.id);
    res.send(feed);
  },
};
