const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Thêm dòng này để import bcrypt




exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const user = await User.create(username, password, email);
        res.status(201).json({ message: 'User  created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByUsername(username); // Kiểm tra xem hàm này có hoạt động không
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Tạo token nếu đăng nhập thành công
        const token = jwt.sign({ id: user.user_id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error); // In ra lỗi để kiểm tra
        res.status(500).json({ message: 'Error during login', error });
    }
};

