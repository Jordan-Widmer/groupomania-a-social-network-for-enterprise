const express = require("express");
const Feed = require("../models/Feed");
const Joi = require("@hapi/joi");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
var mongoose = require("mongoose");
const FeedsController = require("../controllers/Feeds.controller");
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

const router = express.Router();

router.get("/", FeedsController.getAllFeeds);
router.put("/like/:id", FeedsController.likeFeed);
router.post("/comment/:id", FeedsController.commentFeed);
router.post("/", upload.single("file"), FeedsController.addFeed);

module.exports = router;
