const SmartContract = require('../models/SmartContract');

exports.createSmartContract = async (req, res) => {
    const { contractAddress, creatorId, sourceCode } = req.body;
    try {
        const contract = await SmartContract.create(contractAddress, creatorId, sourceCode);
        res.status(201).json({ message: 'Smart contract created successfully', contract });
    } catch (error) {
        res.status(500).json({ message: 'Error creating smart contract', error });
    }
};

exports.getAllSmartContracts = async (req, res) => {
    try {
        const contracts = await SmartContract.getAll();
        res.json(contracts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching smart contracts', error });
    }
};