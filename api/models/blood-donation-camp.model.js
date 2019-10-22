const mongoose = require('mongoose');

const bloodDonationCampSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    start_time: String,
    end_time: String,
    city: String,
    location: {
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
    address: String,
    image_url: String,
    expires_at: Date,
})

module.exports = mongoose.model('BloodDonationCamp', bloodDonationCampSchema);