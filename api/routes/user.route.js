const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', UserController.get_user);
// router.post('/setProfile', checkAuth, UserController.set_profile);

module.exports = router;