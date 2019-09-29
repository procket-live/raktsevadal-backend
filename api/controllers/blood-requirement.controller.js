const mongoose = require('mongoose');

const BloodRequirement = require('../models/blood-requirement.model');

exports.get_my_blood_requirements = (req, res, next) => {
    const userId = req.userData.userId;

    BloodRequirement
        .find({ created_by: userId })
        .exec()
        .then((bloodRequirements) => {
            res.status(201).json({
                success: true,
                response: bloodRequirements
            })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            })
        })
};

exports.get_blood_requirement = (req, res, next) => {
    const userId = req.userData.userId;
    const id = req.params.id;

    BloodRequirement
        .findOne({ _id: id, created_by: userId })
        .exec()
        .then((bloodRequirement) => {
            res.status(201).json({
                success: true,
                response: bloodRequirement
            })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            })
        })
}

exports.get_nearby_blood_requirements = (req, res, next) => {
    const userId = req.userData.userId;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    BloodRequirement
        .find({
            active: true,
            hospital_location: {
                $near: {
                    $maxDistance: 1000,
                    $geometry: {
                        type: "Point",
                        coordinates: [latitude, longitude]
                    }
                }
            },
            created_by: { $ne: userId }
        })
        .exec()
        .then((bloodRequirements) => {
            res.status(201).json({
                success: true,
                response: bloodRequirements
            })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            })
        })
}

exports.add_new_blood_requirement = (req, res, next) => {
    const userId = req.userData.userId;

    const bloodRequirement = new BloodRequirement({
        _id: new mongoose.Types.ObjectId(),
        blood_group: req.body.blood_group,
        blood_unit: req.body.blood_unit,
        patient_name: req.body.patient_name,
        patient_age: req.body.patient_age,
        patient_gender: req.body.patient_gender,
        hospital_name: req.body.hospital_name,
        hospital_address: req.body.hospital_address,
        hospital_location: {
            type: "Point",
            coordinates: req.body.hospital_location
        },
        required_till: req.body.required_till,
        documents: req.body.documents,
        contact_person_name: req.body.contact_person_name,
        contact_person_mobile: req.body.contact_person_mobile,
        created_by: userId,
        created_at: new Date()
    })

    bloodRequirement
        .save()
        .then(() => {
            res.status(201).json({
                success: true,
                response: 'new blood requirement added'
            })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            });
        })
}

exports.remove_blood_requirement = (req, res, next) => {
    const userId = req.userData.userId;
    const id = req.params.id

    BloodRequirement
        .update({ _id: id, created_by: userId }, { $set: { "active": false } })
        .exec()
        .then(() => {
            res.status(201).json({
                success: true,
                response: 'blood requirement removed'
            })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            });
        })
}