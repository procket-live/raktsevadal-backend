const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, UserController.get_user);
router.put('/', checkAuth, UserController.update_user);
router.post('/generateOTP', UserController.create_user_if_not_exist, UserController.generate_otp);
router.post('/verifyOTP', UserController.verify_otp);
router.get('/find', checkAuth, UserController.find_user);

module.exports = router;