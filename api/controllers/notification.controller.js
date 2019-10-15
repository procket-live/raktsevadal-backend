const mongoose = require('mongoose');

const Notification = require('../models/notification.model');
const User = require('../models/user.model');

const sendNotification = require('../utils/notifications');

exports.get_notification = (req, res, next) => {
    const userId = req.userData.userId;

    Notification
        .find({ user: userId })
        .populate('blood_requirement')
        .exec()
        .then((notifications) => {
            res.status(201).json({
                success: true,
                response: notifications
            })
        })
        .catch((err) => {
            res.status(201).json({
                success: false,
                response: err
            })
        })
};

exports.request = (req, res, next) => {
    const userId = req.userData.userId;

    const user = req.body.user_id;
    const bloodRequest = req.body.blood_request_id;
    const message = req.body.message;

    const notification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        user: user,
        blood_requirement: bloodRequest,
        message: message,
        created_by: userId,
        created_at: Date.now()
    });

    notification.save()
        .then(() => {
            res.status(200).json({
                success: true,
                response: 'Blood donation request generated.'
            })

            User
                .find({ _id: user })
                .exec()
                .then((users) => {
                    const token = users[0].firebase_token;
                    sendNotification('Blood donation requirement', message, [token], { show_notification_scene: true });
                })
        })
        .catch((err) => {
            res.status(200).json({
                success: false,
                response: err
            })
        })
};