const mongoose = require('mongoose');

const BloodRequirement = require('../models/blood-requirement.model');
const User = require('../models/user.model');

const sendSms = require('../utils/sendSMS');
const sendNotification = require('../utils/notifications');

exports.get_blood_requirements = (req, res, next) => {
    const userId = req.userData.userId;

    const filter = {
        active: 1
    };

    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const bloodGroups = (req.query.blood_group || '').replaceAll('p', '+').replaceAll('n', '-');
    const createdBy = req.query.created_by;
    const notCreatedBy = req.query.not_created_by;

    if (latitude && longitude) {
        filter.hospital_location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [latitude, longitude]
                },
                $maxDistance: 50 * 1000
            }
        }
    }

    // if (bloodGroups) {
    //     const groups = bloodGroups.split(',');
    //     filter.blood_group = {
    //         $in: groups
    //     }
    // }

    if (createdBy) {
        filter.created_by = {
            $eq: createdBy
        }
    }

    if (notCreatedBy) {
        filter.created_by = {
            $ne: notCreatedBy
        }
    }

    BloodRequirement
        .find(filter)
        .exec()
        .then((bloodRequirements) => {
            res.status(201).json({
                success: true,
                response: bloodRequirements
            })
        })
        .catch((err) => {
            console.log('err', err)
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
        .findOne({ _id: id })
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

exports.bocome_doner = (req, res, next) => {
    const userId = req.userData.userId;
    const id = req.params.id;

    const doner = {
        user: userId,
        created_at: Date.now()
    }

    BloodRequirement
        .update({ _id: id }, { $push: { "doners": doner } })
        .exec()
        .then(() => {
            res.status(201).json({
                success: true,
                response: 'Blood donation request accepted'
            })

            User
                .find({ _id: userId })
                .exec()
                .then((acceptedDoners) => {
                    const acceptedDoner = acceptedDoners[0];
                    const acceptedDonerName = acceptedDoner.name;

                    BloodRequirement
                        .find({ _id: id })
                        .populate('created_by')
                        .exec()
                        .then((bloodReqs) => {
                            const createdByUser = bloodReqs[0].created_by;
                            const bloodGroup = bloodReqs[0].blood_group;
                            const firetoken = createdByUser.firebase_token;
                            const mobile = createdByUser.mobile;

                            const title = 'Blood donation request accepted:';
                            const message = `${acceptedDonerName} has accepted your blood donation request of ${bloodGroups}.`;

                            sendSms(mobile, `${title} \n ${message}`);
                            sendNotification(title, message, [firetoken], { blood_donation_request_id: id });
                        })
                })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: 'Something went wrong'
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

exports.get_accepted_doners = (req, res, next) => {
    const id = req.params.id;

    BloodRequirement
        .find({ _id: id })
        .select('doners')
        .populate('doners.user')
        .exec()
        .then((bloodRequirements) => {
            if (!bloodRequirements.length) {
                return res.status(201).json({
                    success: false,
                    response: 'No blood donation request found'
                })
            }

            const doners = bloodRequirements[0].doners || [];

            res.status(201).json({
                success: true,
                response: doners
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
            coordinates: [
                req.body.hospital_location_latitude,
                req.body.hospital_location_longitude
            ]
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

exports.got_blood_requirement = (req, res, next) => {
    const userId = req.userData.userId;
    const id = req.params.id

    BloodRequirement
        .update({ _id: id, created_by: userId }, { $set: { "active": false, "fulfiled": true } })
        .exec()
        .then(() => {
            res.status(201).json({
                success: true,
                response: 'blood requirement fulfiled'
            })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            });
        })
}