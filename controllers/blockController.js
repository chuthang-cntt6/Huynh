const Block = require('../models/Block');
const Transaction = require('../models/Transaction'); // Import model Transaction

exports.createBlock = async (req, res) => {
    const { blockNumber, previousHash, data, nonce } = req.body;
    try {
        const block = await Block.create(blockNumber, previousHash, data, nonce);
        res.status(201).json({ message: 'Block created successfully', block });
    } catch (error) {
        res.status(500).json({ message: 'Error creating block', error });
    }
};

exports.getAllBlocks = async (req, res) => {
    try {
        const blocks = await Block.getAll();
        res.json(blocks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blocks', error });
    }
};

exports.getLatestBlock = async (req, res) => {
    try {
        const latestBlock = await Block.getLatest();
        res.json(latestBlock);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the latest block', error });
    }
};

exports.getTransactionsByBlock = async (req, res) => {
    const blockNumber = req.params.blockNumber;
    try {
        const transactions = await Transaction.getByBlockNumber(blockNumber); // Gọi phương thức trong model
        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this block.' });
        }
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
};

exports.createTransaction = async (req, res) => {
    const { sender, receiver, amount } = req.body;

    try {
        // Lấy block mới nhất
        const latestBlock = await Block.getLatest();
        const newBlockNumber = latestBlock.block_number + 1; // Tăng số block lên 1
        const previousHash = latestBlock.hash; // Lấy hash của block trước đó

        // Tạo block mới
        const newBlock = await Block.create(newBlockNumber, previousHash, {}, 0); // Tạo block mới

        // Tạo giao dịch trong block mới
        const transaction = await Transaction.create(newBlock.block_id, sender, receiver, amount);
        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error });
    }
};