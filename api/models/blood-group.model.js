const mongoose = require('mongoose');

const bloodGroupModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
})

module.exports = mongoose.model('BloodGroup', bloodGroupModel);