const Transaction = require('../models/Transaction');
const bcrypt = require('bcryptjs'); // Thêm dòng này để import bcrypt


exports.createTransaction = async (req, res) => {
    const { blockId, sender, receiver, amount } = req.body;
    try {
        const transaction = await Transaction.create(blockId, sender, receiver, amount);
        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
 res.status(500).json({ message: 'Error creating transaction', error });
    }
};

exports.getTransactionHistory = async (req, res) => {
    const userId = req.params.userId;
    try {
        const history = await Transaction.getHistory(userId);
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction history', error });
    }
};