const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET คำสั่งซื้อทั้งหมด
router.get('/', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// GET คำสั่งซื้อโดยใช้ ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM orders WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(results[0]);
    });
});

// POST สร้างคำสั่งซื้อ
router.post('/', (req, res) => {
    const { user_id, menu_items } = req.body;
    if (!user_id || !menu_items) {
        return res.status(400).json({ error: 'User ID and menu items are required' });
    }
    db.query(
        'INSERT INTO orders (user_id, payment_status) VALUES (?, ?)',
        [user_id, 'pending'], // ตั้งสถานะเริ่มต้นเป็น 'pending'
        (err, results) => {
            if (err) return res.status(500).send(err);

            const orderId = results.insertId; // รับ ID ของคำสั่งซื้อที่สร้างขึ้น

            // แทรกข้อมูล order_items
            const orderItems = menu_items.map(item => [orderId, item.menu_item_id, item.quantity]);
            db.query('INSERT INTO order_items (order_id, menu_item_id, quantity, total_price) VALUES ?', [orderItems.map(item => [item[0], item[1], item[2], item[2] * item[3]])], (err) => {
                if (err) return res.status(500).send(err);
                res.status(201).json({
                    id: orderId,
                    user_id,
                    menu_items,
                });
            });
        }
    );
});

// PUT อัปเดตคำสั่งซื้อ
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { payment_status } = req.body; 
    db.query('UPDATE orders SET payment_status = ? WHERE id = ?', [payment_status, id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order updated successfully.' });
    });
});

// DELETE ลบคำสั่งซื้อ
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM order_items WHERE order_id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
    });
    db.query('DELETE FROM orders WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    });
});

module.exports = router;
