const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: { type: String, required: true },
    mobile: {
        type: String,
        require: true,
        unique: true,
    },
    is_mobile_verified: { type: Boolean, default: false },
})

module.exports = mongoose.model('User', userSchema);