const express = require('express');
const router = express.Router();
const blockController = require('../controllers/blockController');
const transactionController = require('../controllers/transactionController');


router.post('/blocks', blockController.createBlock);
router.get('/blocks', blockController.getAllBlocks);
router.get('/blocks/latest', blockController.getLatestBlock);
router.get('/blocks/:blockNumber/transactions', blockController.getTransactionsByBlock);
router.post('/transactions', transactionController.createTransaction);


module.exports = router;