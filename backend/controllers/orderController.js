const Order = require('../models/orderModel');

const orderController = {
    // GET: ดึงข้อมูลคำสั่งซื้อทั้งหมด (หรือกรองตาม user_id)
    getAllOrders: (req, res) => {
        const userId = req.query.user_id;  // ดึงค่าจาก query params เช่น /orders?user_id=123
        let query = 'SELECT * FROM orders';
        let queryParams = [];

        // หากมี user_id จะเพิ่มเงื่อนไขการกรอง
        if (userId) {
            query += ' WHERE user_id = ?';
            queryParams.push(userId);
        }

        Order.getAllOrders(query, queryParams, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);  // ส่งข้อมูลคำสั่งซื้อทั้งหมดหรือกรองตาม user_id
        });
    },

    // POST: สร้างคำสั่งซื้อใหม่
    createOrder: (req, res) => {
        const { user_id, total_price } = req.body;

        // ตรวจสอบว่า user_id และ total_price มีหรือไม่
        if (!user_id || !total_price) {
            return res.status(400).json({ message: 'user_id and total_price are required.' });
        }

        Order.createOrder(user_id, total_price, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({ id: results.insertId, user_id, total_price });
        });
    },

    // PUT: อัปเดตคำสั่งซื้อ
    updateOrder: (req, res) => {
        const { id } = req.params;
        const { total_price, payment_status } = req.body;

        // ตรวจสอบว่า total_price และ payment_status มีหรือไม่
        if (!total_price || !payment_status) {
            return res.status(400).json({ message: 'total_price and payment_status are required.' });
        }

        Order.updateOrder(id, total_price, payment_status, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Order updated successfully.' });
        });
    },

    // DELETE: ลบคำสั่งซื้อ
    deleteOrder: (req, res) => {
        const { id } = req.params;

        Order.deleteOrder(id, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Order deleted successfully.' });
        });
    }
};

module.exports = orderController;
