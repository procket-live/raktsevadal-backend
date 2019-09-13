const express = require('express');
const router = express.Router();

const bloodGroupController = require('../controllers/blood-group.controller');

router.get('/', bloodGroupController.get_bloodgroups);
// router.post('/', bloodGroupController.add_bloodgroup);

module.exports = router;