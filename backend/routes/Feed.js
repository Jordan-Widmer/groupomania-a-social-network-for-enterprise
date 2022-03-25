const express = require('express');
const Feed = require('../models/Feed');
const Joi = require('@hapi/joi');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var mongoose = require('mongoose');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve();
        const localPath = `${uploadPath}/uploads/`;
        cb(null, localPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

const router = express.Router();

router.get('/', async (req, res) => {
    const feed = await Feed
        .find()
        .populate('addedBy')
        .populate('comments.commentBy');
    res.send(feed);
});
router.put('/like/:id', async (req, res) => {
    Feed.findOneAndUpdate({ _id: req.params.id },
        { $inc: { 'like': 1 } },
        { new: true },
        function (err, response) {
            res.send(response)
        });
});
router.post('/comment/:id', async (req, res) => {

    Feed.findOneAndUpdate({ _id: req.params.id },
        { $push: { comments: [{ ...req.body }] } },
        function (err, response) {
            res.send(response)
        });
});



router.post('/', upload.single('file'), async (req, res) => {
    const {
        text,
        addedBy,
    } = req.body;
    try {
        feed = new Feed({
            Text: text,
            addedBy: addedBy,
            image: req.file ? req.file.filename : ""
        })
        await feed.save();
        res.status(200).send(feed);
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
});



module.exports = router;