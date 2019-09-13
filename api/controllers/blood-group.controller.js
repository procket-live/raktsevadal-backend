const mongoose = require('mongoose');

const BloodGroup = require('../models/blood-group.model');

exports.get_bloodgroups = (req, res, next) => {
    BloodGroup
        .find()
        .exec()
        .then((bloodGroups) => {
            res.status(201).json({
                success: true,
                response: bloodGroups
            })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            })
        })
};

exports.add_bloodgroup = (req, res, next) => {
    const bg = new BloodGroup({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });

    bg.save()
        .then(() => {
            res.status(200).json({
                success: true,
                response: 'blood group added'
            })
        })
        .catch((err) => {
            res.status(200).json({
                success: false,
                response: err
            })
        })
};