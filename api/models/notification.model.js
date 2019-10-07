const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    blood_requirement: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'BloodRequirement' },
    message: String,
    created_by: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    created_at: mongoose.Schema.Types.Date
})

module.exports = mongoose.model('Notification', notificationSchema);