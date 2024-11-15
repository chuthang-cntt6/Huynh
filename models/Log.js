const db = require('../config/db');

class Log {
    static async create(level, message) {
        const result = await db.query(
            'INSERT INTO Logs (level, message) VALUES ($1, $2) RETURNING *',
            [level, message]
        );
        return result.rows[0];
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM Logs');
        return result.rows;
    }
}

module.exports = Log;