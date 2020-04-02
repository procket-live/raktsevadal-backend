const mongoose = require('mongoose');

const Post = require('../models/post.model');

exports.create_tournament = (req, res) => {
    const userId = req.userData.userId;
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        location: {
            type: "Point",
            coordinates: [req.body.latitude, req.body.longitude]
        },
        location_address: req.body.location_address,
        image: req.body.image,
        caption: req.body.caption,
        created_by: userId
    });
    console.log('post', post)
    post
        .save()
        .then(() => {
            res.status(200).json({
                success: true
            });
        })
        .catch((err) => {
            res.status(200).json({
                success: false,
                response: err
            })
        })
};

exports.get_my_post = (req, res) => {
    const userId = req.userData.userId;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;

    const filter = {
        deleted_at: null
    }

    if (!req.query.all) {
        filter.created_by = userId;
    }

    if (latitude && longitude) {
        filter.location = {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [latitude, longitude]
                }
            }
        }
    }

    Post
        .find(filter)
        .sort('-created_at')
        .populate('created_by', '-_id name')
        .exec()
        .then((posts) => {
            return res.status(200).json({
                success: true,
                response: posts
            });
        })
        .catch((res) => {
            return res.status(200).json({
                success: false,
                response: err
            });
        })
}


exports.like_post = (req, res) => {
    const userId = req.userData.userId;
    const postId = req.params.id;

    Post
        .findByIdAndUpdate(postId, { $push: { liked_by: userId }, $inc: { likes: 1 } })
        .exec()
        .then(() => {
            return res.status(200).json({
                success: true
            });
        })
        .catch(() => {
            return res.status(200).json({
                success: false
            });
        })
}

exports.unlike_post = (req, res) => {
    const userId = req.userData.userId;
    const postId = req.params.id;

    Post
        .findByIdAndUpdate(postId, { $pull: { liked_by: userId }, $inc: { likes: -1 } })
        .exec()
        .then(() => {
            return res.status(200).json({
                success: true
            });
        })
        .catch(() => {
            return res.status(200).json({
                success: false
            });
        })
}

exports.add_comment = (req, res) => {
    const userId = req.userData.userId;
    const postId = req.params.id;

    Post
        .findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: {
                        message: req.body.message,
                        created_by: userId
                    }
                }
            }
        )
        .exec()
        .then(() => {
            return res.status(200).json({
                success: true
            });
        })
        .catch(() => {
            return res.status(200).json({
                success: false
            });
        })
}   