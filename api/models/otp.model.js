const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mobile: { type: String, require: true },
    otp: { type: String, require: true },
    expires: mongoose.Schema.Types.Date,
    deleted_at: mongoose.Schema.Types.Date
})

module.exports = mongoose.model('Otp', otpSchema);