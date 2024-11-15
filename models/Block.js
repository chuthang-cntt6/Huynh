const db = require('../config/db');

class Block {
    static async create(blockNumber, previousHash, data, nonce) {
        const result = await db.query(
            'INSERT INTO Blocks (block_number, previous_hash, data, nonce) VALUES ($1, $2, $3, $4) RETURNING *',
            [blockNumber, previousHash, data, nonce]
        );
        return result.rows[0];
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM Blocks');
        return result.rows;
    }

    static async getLatest() {
        const result = await db.query('SELECT * FROM Blocks ORDER BY block_number DESC LIMIT 1');
        return result.rows[0]; // Trả về khối mới nhất
    }

    static async getByNumber(blockNumber) {
        const result = await db.query('SELECT * FROM Blocks WHERE block_number = $1', [blockNumber]);
        return result.rows[0]; // Trả về block nếu tìm thấy
    }
}

module.exports = Block;