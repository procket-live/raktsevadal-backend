const express = require('express');
const router = express.Router();

const BloodRequirementController = require('../controllers/blood-requirement.controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, BloodRequirementController.get_my_blood_requirements);
router.get('/:id', checkAuth, BloodRequirementController.get_blood_requirement);
router.delete('/:id', checkAuth, BloodRequirementController.remove_blood_requirement);
router.post('/', checkAuth, BloodRequirementController.add_new_blood_requirement);
router.post('/nearby', checkAuth, BloodRequirementController.get_nearby_blood_requirements);

module.exports = router;