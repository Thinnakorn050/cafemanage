const Order = require('../models/orderModel');

// ดึงข้อมูลคำสั่งซื้อทั้งหมด
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAllOrders(); // เปลี่ยนชื่อฟังก์ชัน
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ดึงข้อมูลคำสั่งซื้อโดยใช้ id
exports.getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Order.getOrderById(id); // เปลี่ยนชื่อฟังก์ชัน
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// สร้างคำสั่งซื้อใหม่
exports.createOrder = async (req, res) => {
    const { user_id, menu_items } = req.body;
    try {
        const result = await Order.createOrder(user_id, menu_items); // เปลี่ยนชื่อฟังก์ชัน
        res.status(201).json({ message: 'Order created', orderId: result.orderId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// อัปเดตคำสั่งซื้อ
exports.updateOrder = async (req, res) => {
    const id = req.params.id;
    const { payment_status } = req.body; // เปลี่ยนชื่อฟิลด์
    try {
        const result = await Order.updateOrder(id, payment_status); // เปลี่ยนชื่อฟังก์ชัน
        if (!result) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ลบคำสั่งซื้อ
exports.deleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Order.deleteOrder(id); // เปลี่ยนชื่อฟังก์ชัน
        if (!result) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
