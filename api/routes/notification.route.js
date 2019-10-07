const express = require('express');
const router = express.Router();

const NotficationController = require('../controllers/notification.controller');
const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, NotficationController.get_notification);
router.post('/request', checkAuth, NotficationController.request);

module.exports = router;