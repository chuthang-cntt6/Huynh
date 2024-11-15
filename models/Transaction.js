const db = require('../config/db');

class Transaction {
    static async create(blockId, sender, receiver, amount) {
        const result = await db.query(
            'INSERT INTO Transactions (block_id, sender, receiver, amount, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [blockId, sender, receiver, amount, 'pending']
        );
        return result.rows[0];
    }

    static async getHistory(userId) {
        const result = await db.query(
            'SELECT * FROM Transactions WHERE sender = $1 OR receiver = $1',
            [userId]
        );
        return result.rows;
    }

    static async getByBlockNumber(blockNumber) {
        const result = await db.query('SELECT * FROM Transactions WHERE block_id = $1', [blockNumber]);
        return result.rows; // Trả về danh sách giao dịch
    }

}

module.exports = Transaction;