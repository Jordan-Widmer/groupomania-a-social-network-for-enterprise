const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const path = require('path');

const multer = require('multer');
const fs = require('fs');
const UserController = require('../controllers/User.controller');

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


router.post('/', UserController.registerUser);
router.put('/:id', upload.single('file'), UserController.updateUser);
router.delete('/:id', UserController.deleteUser);


module.exports = router;