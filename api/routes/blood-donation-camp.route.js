const express = require('express');
const router = express.Router();

const bloodDonationCamp = require('../controllers/blood-donation-camp.controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, bloodDonationCamp.get_camps);

module.exports = router;