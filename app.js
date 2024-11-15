const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const blockRoutes = require('./routes/blockRoutes'); // Đảm bảo rằng bạn đã import đúng
const smartContractRoutes = require('./routes/smartContractRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Đảm bảo thư mục public tồn tại

app.use('/api/auth', authRoutes);
app.use('/api', transactionRoutes);
app.use('/api', blockRoutes); // Sử dụng blockRoutes đã import
app.use('/api', smartContractRoutes);
app.use('/api', logRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});