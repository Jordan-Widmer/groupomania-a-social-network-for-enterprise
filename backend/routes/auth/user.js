const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../../models/User');

const router = express.Router();



/**
 * @route POST / api/auth
 * @description Authorize user & get token
 * @access Public
 */
router.post('/', async (req, res) => {
    // Validating Request Body
    const { error } = signInValidationSchema.validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }
    // Pulling the info from req body
    const { email, password } = req.body;

    try {
        // Finding user in Database 
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }

        res.send(user)
    }
    catch (err) {

        res.status(500).send('Server Error');
    }

});


// Schema Validation Object
const signInValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().max(20),
});

module.exports = router;