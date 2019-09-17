const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    mobile: {
        type: String,
        require: true,
        unique: true,
    },
    blood_group: String,
    dob: String,
    gender: String,
    firebase_token: String,
    latest_location: {
        latitude: { type: mongoose.Schema.Types.String },
        longitude: { type: mongoose.Schema.Types.String }
    },
    profile_image: String
})

module.exports = mongoose.model('User', userSchema);