const Log = require('../models/Log');

exports.createLog = async (req, res) => {
    const { level, message } = req.body;
    try {
        const log = await Log.create(level, message);
        res.status(201).json({ message: 'Log created successfully', log });
    } catch (error) {
        res.status(500).json({ message: 'Error creating log', error });
    }
};

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.getAll();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error });
    }
};