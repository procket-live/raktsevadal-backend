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