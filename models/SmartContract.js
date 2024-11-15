const db = require('../config/db');

class SmartContract {
    static async create(contractAddress, creatorId, sourceCode) {
        const result = await db.query(
            'INSERT INTO SmartContracts (contract_address, creator_id, source_code) VALUES ($1, $2, $3) RETURNING *',
            [contractAddress, creatorId, sourceCode]
        );
        return result.rows[0];
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM SmartContracts');
        return result.rows;
    }
}

module.exports = SmartContract;