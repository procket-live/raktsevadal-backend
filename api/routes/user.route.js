const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, UserController.get_user);
router.post('/generateOTP', UserController.create_user_if_not_exist, UserController.generate_otp);
router.post('/verifyOTP', UserController.verify_otp);
router.post('/setFirebaseToken', checkAuth, UserController.set_firebase_token);

module.exports = router;