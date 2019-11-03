const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
mongoose.set('useCreateIndex', true);

const userRoutes = require('./api/routes/user.route');
const bloodGroupRoutes = require('./api/routes/blood-group.route');
const bloodGroupRequirementRoutes = require('./api/routes/blood-requirement.route');
const notificatonRoutes = require('./api/routes/notification.route');
const bloodDonationCampRoutes = require('./api/routes/blood-donation-camp.route');

const userModel = require('./api/models/user.model');
const bloodDonationCampModel = require('./api/models/blood-donation-camp.model');
const bloodRequirementModel = require('./api/models/blood-requirement.model');
const notificationModel = require('./api/models/notification.model');
const otpModel = require('./api/models/otp.model');

const app = express();

const database = mongoose.connect(
    'mongodb+srv://raktsevadal:jJnfw5WxYUj503Np@cluster0-havth.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true
    }
).then((db) => {
    db.models.BloodRequirement.createIndexes({ hospital_location: "2dsphere" });
})

mongoose.Promise = global.Promise;
AdminBro.registerAdapter(require('admin-bro-mongoose'))
const adminBro = new AdminBro({
    resources: [
        {
            resource: userModel,
            actions: {
                new: {
                    before: (request) => {
                        return request
                    },
                }
            }
        },
        bloodDonationCampModel, bloodRequirementModel, notificationModel, otpModel],
    rootPath: '/admin',
    branding: {
        companyName: 'Rakt Sevadal',
    }
})
// adminBroRouter = AdminBroExpressjs.buildRouter(adminBro);
adminBroRouter = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await userModel.findOne({ email })
        console.log('user',user);
        if (user) {
            const matched = password == user.password;
            if (matched) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
})

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

app.use(adminBro.options.rootPath, adminBroRouter)

app.use('/user', userRoutes);
app.use('/bloodGroup', bloodGroupRoutes);
app.use('/bloodGroupRequirement', bloodGroupRequirementRoutes);
app.use('/notification', notificatonRoutes);
app.use('/camp', bloodDonationCampRoutes);

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