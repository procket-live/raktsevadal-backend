const express = require('express');
const router = express.Router();

const bloodGroupController = require('../controllers/blood-group.controller');

router.get('/', bloodGroupController.get_bloodgroups);

module.exports = router;