const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/user.model');

exports.get_user = (req, res, next) => {
    res.status(201).json({
        success: true,
    })
};
