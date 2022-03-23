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
            image: req.file.filename
        })
        await feed.save();
        res.status(200).send(feed);
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Server Error');
    }
});

/**
 * @route Put / api/courses/:id
 * @description update course
 * @access Private
 */
// router.put('/:id', async (req, res) => {

//     const { title, subTitle, description, publication_Status } = req.body;

//     // Build contact object
//     const updatedCourse = {};
//     if (title) updatedCourse.title = title;
//     if (subTitle) updatedCourse.subTitle = subTitle;
//     if (description) updatedCourse.description = description;
//     if (publication_Status) updatedCourse.publication_Status = publication_Status;

//     console.log(req.param.id)
//     try {

//         let course = await Course.findById(req.params.id);
//         if (!course) return res.status(404).json({ msg: 'Course not found' });

//         // Make sure user owns contact
//         if (course.educator_id.toString() !== req.user.id)
//             return res.status(401).json({ msg: 'Not authorized' });

//         course = await Course.findByIdAndUpdate(
//             req.params.id,
//             { $set: updatedCourse },
//             { new: true }
//         );

//         res.json(course);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }

// });

// /**
//  * @route DELETE / api/course
//  * @description remove course
//  * @access Private
//  */
// router.delete('/:id', async (req, res) => {
//     try {
//         const course = await Course.findById(req.params.id);
//         if (!course) return res.status(404).json({ msg: 'Course with this id does not exists' });
//         // Make sure user owns course
//         if (course.educator_id.toString() !== req.user.id)
//             return res.status(401).json({ msg: 'Not authorized' });

//         // RegisterCourse.deleteMany({ course_id: req.params.id }).then((d) => {
//         //     console.log(d.deletedCount);
//         // });
//         await Course.findByIdAndRemove(req.params.id);
//         res.status(200).json({ msg: 'Course removed' });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }

// });



module.exports = router;