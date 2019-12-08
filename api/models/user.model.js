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
    request: { type: Number, default: 0 },
    donate: { type: Number, default: 0 },
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
    location_address: String,
    profile_image: String,
    role: { type: String, enum: ['admin', 'restricted', 'user', 'head'], required: true, default: 'user' },
    password: { type: String },
    last_blood_donation: { type: Date },
    rating: { type: Number, default: 4.5 },
    email: { type: String, unique: true }
});

userSchema.index({ latest_location: '2dsphere' });
module.exports = mongoose.model('User', userSchema);