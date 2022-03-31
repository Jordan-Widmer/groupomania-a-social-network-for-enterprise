const express = require("express");
const Feed = require("../models/Feed");
const Joi = require("@hapi/joi");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
var mongoose = require("mongoose");
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
};
