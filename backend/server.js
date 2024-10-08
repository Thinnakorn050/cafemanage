const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const userRoutes = require('./routes/users'); // แก้ไขเป็น 'users' หรือเปลี่ยนชื่อ
const orderRoutes = require('./routes/orders');
const orderItemsRoutes = require('./routes/orderItems'); // เพิ่มการเรียกใช้งานเส้นทางใหม่สำหรับ orderItems
const authRoutes = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(bodyParser.json());

// ตั้งค่า CORS ให้อนุญาตให้เข้าถึงจาก localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // กำหนด URL ที่อนุญาตให้เข้าถึง API
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // วิธีที่อนุญาต
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orders/items', orderItemsRoutes);  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
