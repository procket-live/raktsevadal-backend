const BloodDonationCamp = require('../models/blood-donation-camp.model');

exports.get_camps = (req, res, next) => {
    BloodDonationCamp
        .find()
        .populate('users_going', 'name profile_image')
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

exports.join_camp = (req, res, next) => {
    const id = req.body.id;
    const userId = req.userData.userId;

    BloodDonationCamp
        .update({ _id: id }, { $push: { "users_going": userId } })
        .exec()
        .then(() => {
            BloodDonationCamp
                .find({ _id: id })
                .exec()
                .then((result) => {
                    return res.status(201).json({
                        success: true,
                        response: result
                    })
                })
                .catch((err) => {
                    res.status(201).json({
                        success: false,
                        response: err
                    })
                })

        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            })
        })
}