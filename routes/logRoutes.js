const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/logs', logController.createLog);
router.get('/logs', logController.getAllLogs);

module.exports = router;