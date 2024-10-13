const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(bodyParser.json());

// ตั้งค่า CORS ให้อนุญาตให้เข้าถึงจาก localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Routes
app.use('/api/users',userRoutes);
app.use('/api/auth', authRoutes); // สำหรับการจัดการการล็อกอิน
app.use('/api/users/register', userRoutes); // สำหรับการลงทะเบียน
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
