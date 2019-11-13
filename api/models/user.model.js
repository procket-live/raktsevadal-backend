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
        },
        coordinates: {
            type: [Number],
        }
    },
    profile_image: String,
    role: { type: String, enum: ['admin', 'restricted', 'user', 'head'], required: true, default: 'user' },
    password: { type: String },
    last_blood_donation: { type: String },
    email: { type: String, unique: true }
});

userSchema.index({ latest_location: '2dsphere' });
module.exports = mongoose.model('User', userSchema);