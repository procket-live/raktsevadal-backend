const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/user.model');
const Otp = require('../models/otp.model');
const MSG91SendSMS = require('../utils/sendSMS')

exports.get_user = (req, res, next) => {
    User.find({ _id: req.userData.userId })
        .populate({
            path: 'blood_group',
        })
        .exec()
        .then((users) => {
            if (users.length == 0) {
                return res.status(201).json({
                    success: false,
                    response: 'unable to find user'
                })
            }

            return res.status(201).json({
                success: true,
                response: users[0]
            })
        }).catch((err) => {
            return res.status(201).json({
                success: false,
                response: err
            })
        })
};

exports.create_user_if_not_exist = (req, res, next) => {
    const mobile = req.body.mobile;
    User.find({ mobile })
        .exec()
        .then((users) => {
            if (users.length == 0) {
                //creating new user
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    mobile
                })

                user
                    .save()
                    .then(() => {
                        User.findOne({ mobile })
                            .exec()
                            .then((newUser) => {
                                req.userId = newUser._id;
                                next();
                            })
                    })
                    .catch((err) => {
                        res.status(200).json({
                            success: false,
                            response: err
                        })
                    })
            } else {
                req.userId = users[0]._id;
                next();
            }
        })
}

exports.generate_otp = (req, res, next) => {
    const userId = req.userId;

    User.findOne({ _id: userId })
        .exec()
        .then((user) => {
            const mobile = user.mobile;

            const generatedOtp = Math.floor(100000 + Math.random() * 900000);

            const otp = new Otp({
                _id: new mongoose.Types.ObjectId(),
                mobile,
                otp: generatedOtp,
                expires: moment().add('15', 'minutes').format('YYYY-MM-DD HH:mm:ss')
            })

            otp
                .save()
                .then(() => {
                    const template = `Welcome to Raktsevadal. One Time Password to verify mobile number is ${generatedOtp}`;
                    MSG91SendSMS(mobile, template);
                    res.status(201).json({
                        success: true,
                        response: 'otp sent successfully',
                    })
                })
                .catch((err) => {
                    return res.status(200).json({
                        success: false,
                        response: 'something went wrong'
                    });
                })
        });
}

exports.verify_otp = (req, res, next) => {
    const mobile = req.body.mobile;
    const otp = req.body.otp;

    Otp.find({ mobile, otp })
        .exec()
        .then((results) => {
            if (results.length == 0) {
                return res.status(200).json({
                    success: false,
                    response: 'otp expired, please try again'
                })
            }
            if (results[0].otp == otp) {
                User.find({ mobile })
                    .exec()
                    .then((users) => {
                        const token = jwt.sign(
                            {
                                userId: users[0]._id,
                                mobile: users[0].mobile
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "500h"
                            }
                        );

                        return res.status(200).json({
                            success: true,
                            response: users[0],
                            token
                        })
                    })
                    .catch(() => {
                        return res.status(200).json({
                            success: false,
                            response: 'unable to find user'
                        })
                    })

            } else {
                return res.status(200).json({
                    success: false,
                    response: 'wrong otp'
                })
            }
        })
}

exports.update_user = (req, res, next) => {
    const userId = req.userData.userId;
    const body = req.body;

    const updateParams = {};

    Object.keys(body).forEach((key) => {
        updateParams[key] = body[key];
    })

    User.update({ _id: userId }, { $set: updateParams })
        .exec()
        .then(() => {
            res.status(201).json({
                success: true,
                response: 'updated'
            })
        })
        .catch((err) => {
            res.status(200).json({
                success: false,
                response: err
            })
        })
}