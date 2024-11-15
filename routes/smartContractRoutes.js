const express = require('express');
const router = express.Router();
const smartContractController = require('../controllers/smartContractController');

router.post('/smart-contracts', smartContractController.createSmartContract);
router.get('/smart-contracts', smartContractController.getAllSmartContracts);

module.exports = router;