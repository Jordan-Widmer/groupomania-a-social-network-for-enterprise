const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const FeedsController = require("../controllers/Feeds.controller");
const AuthGuard = require("../middlewares/AuthGard");
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
router.get("/:id/comments", FeedsController.getComments);
router.get("/:id/likes", FeedsController.getLikes);
router.put("/like/:id", AuthGuard, FeedsController.likeFeed);
router.put("/dislike/:id", AuthGuard, FeedsController.dislikeFeed);
router.post("/comment/:id", AuthGuard, FeedsController.commentFeed);
router.put("/comment/d/:id", AuthGuard, FeedsController.deleteCommentFeed);
router.put("/comment/:id", AuthGuard, FeedsController.editComment);
router.post("/", [upload.single("file"), AuthGuard], FeedsController.addFeed);
router.put(
  "/:id",
  [upload.single("file"), AuthGuard],
  FeedsController.editFeed
);
router.delete(
  "/:id",
  [upload.single("file"), AuthGuard],
  FeedsController.deleteFeed
);

module.exports = router;
