const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    mobile: {
        type: String,
        require: true,
        unique: true,
    },
    blood_group: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodGroup' },
    dob: { type: mongoose.Schema.Types.Date },
    firebase_token: String,
    latest_location: {
        latitude: { type: mongoose.Schema.Types.String },
        longitude: { type: mongoose.Schema.Types.String }
    },
    profile_image: String,
    gender: String,
})

module.exports = mongoose.model('User', userSchema);