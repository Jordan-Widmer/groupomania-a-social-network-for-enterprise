const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    imageAvatar: {
        type: String,
        default: 'defaultAvatar.svg'
    }
});

module.exports = mongoose.model('User', userSchema);