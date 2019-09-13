const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const userRoutes = require('./api/routes/user.route');

const app = express();

mongoose.connect(
    'mongodb+srv://raktsevadal:jJnfw5WxYUj503Np@cluster0-havth.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        success: false,
        response: error.message
    });
});

module.exports = app;