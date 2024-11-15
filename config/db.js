const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // Thay thế bằng tên người dùng PostgreSQL của bạn
    host: 'localhost',
    database: 'private_blockchain',
    password: '2504', // Thay thế bằng mật khẩu PostgreSQL của bạn
    port: 5433,
});

module.exports = pool;