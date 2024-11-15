const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async create(username, password, email) {
 const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO Users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );
        return result.rows[0];
    }

    static async findByUsername(username) {
        const result = await db.query('SELECT * FROM Users WHERE username = $1', [username]);
        return result.rows[0];
    }


}

module.exports = User;