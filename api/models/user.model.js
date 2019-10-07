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
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    profile_image: String
});

userSchema.index({ latest_location: '2dsphere' });
module.exports = mongoose.model('User', userSchema);