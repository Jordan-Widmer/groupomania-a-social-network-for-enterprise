const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const path = require('path');

const multer = require('multer');
const fs = require('fs');

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

module.exports = {
    registerUser: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User With this Email Already Exist' });
            }
            user = new User({
                name,
                email,
                password
            });
            await user.save();
            res.send(user)
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    },
    updateUser: async (req, res) => {

        const { name, email, password } = req.body
        // Build contact object
        const updateUser = {};
        if (name) updateUser.name = name;
        if (email) updateUser.email = email;
        if (password) updateUser.password = password;
        if (req.file) updateUser.imageAvatar = req.file.filename
        try {

            var user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: updateUser },
                { new: true }
            );
            res.json(user);
        } catch (error) {
            console.log(error)
            res.status(500).send('Server Error')
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            res.send(user);
        } catch (error) {
            console.log(error)
            res.status(500).send('Server Error')
        }
    }
}