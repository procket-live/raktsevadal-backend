const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    mobile: {
        type: String,
        require: true,
        unique: true,
    },
    is_mobile_verified: { type: Boolean, default: false },
    blood_group: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodGroup' },
    dob: { type: mongoose.Schema.Types.Date },
    firebase_token: String,
})

module.exports = mongoose.model('User', userSchema);