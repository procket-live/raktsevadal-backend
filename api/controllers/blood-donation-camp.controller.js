const BloodDonationCamp = require('../models/blood-donation-camp.model');

exports.get_camps = (req, res, next) => {
    BloodDonationCamp
        .find()
        .exec()
        .then((response) => {
            res.status(201).json({
                success: true,
                response
            })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            })
        })
};