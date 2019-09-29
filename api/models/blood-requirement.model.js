const mongoose = require('mongoose');

const bloodRequirementModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    active: { type: mongoose.Schema.Types.Boolean, default: true },
    fulfiled: { type: mongoose.Schema.Types.Boolean, default: false },
    blood_group: { type: mongoose.Schema.Types.String, require: true },
    blood_unit: { type: mongoose.Schema.Types.Number },
    patient_name: { type: String, require: true },
    patient_age: { type: String, require: true },
    patient_gender: { type: String, require: true },
    hospital_name: { type: String, require: true },
    hospital_address: { type: String, require: true },
    hospital_location: {
        type: String,
        coordinates: []
    },
    required_till: { type: mongoose.Schema.Types.Date },
    documents: [{ type: mongoose.Schema.Types.String }],
    contact_person_name: { type: mongoose.Schema.Types.String, require: true },
    contact_person_mobile: String,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: mongoose.Schema.Types.Date }
})

module.exports = mongoose.model('BloodRequirement', bloodRequirementModel);