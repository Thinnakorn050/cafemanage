const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET ทั้งหมดของคำสั่งซื้อ
router.get('/', (req, res) => {
    const query = `
        SELECT 
            orders.id AS order_id,
            orders.user_id,
            orders.order_date,
            orders.total_price,
            orders.payment_status
        FROM orders;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'มีข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ' });
        }
        res.json(results);
    });
});

// GET คำสั่งซื้อเฉพาะ ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT 
            orders.id AS order_id,
            orders.user_id,
            orders.order_date,
            orders.total_price,
            orders.payment_status,
            menu_items.name AS menu_name,
            menu_items.price AS menu_price,
            order_items.quantity
        FROM 
            orders
        LEFT JOIN 
            order_items ON orders.id = order_items.order_id
        LEFT JOIN 
            menu_items ON order_items.menu_item_id = menu_items.id
        WHERE 
            orders.id = ?;
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('มีข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ');
        }
        res.json(results);
    });
});

// POST สร้างคำสั่งซื้อใหม่
router.post('/', (req, res) => {
    const { user_id, total_price, order_items } = req.body;

    if (!user_id || !total_price || !order_items || order_items.length === 0) {
        return res.status(400).json({ message: 'user_id, total_price และ order_items เป็นข้อมูลที่จำเป็น' });
    }

    db.query('INSERT INTO orders (user_id, total_price, payment_status) VALUES (?, ?, ?)', [user_id, total_price, 'pending'], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ');
        }

        const order_id = results.insertId;

        const orderItemsQuery = 'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ?';
        const orderItemsValues = order_items.map(item => [order_id, item.menu_item_id, item.quantity, item.price]);

        db.query(orderItemsQuery, [orderItemsValues], (err, results) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มรายการสินค้า');
            }
            res.status(201).json({ order_id, user_id, total_price, order_items });
        });
    });
});

// PUT อัปเดตคำสั่งซื้อ
router.put('/:id', (req, res) => {
    const orderId = req.params.id;
    const { customerName, totalPrice, description, paymentStatus } = req.body;

    if (!customerName || !totalPrice || !paymentStatus) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const query = 'UPDATE orders SET customerName = ?, totalPrice = ?, description = ?, paymentStatus = ? WHERE id = ?';
    db.query(query, [customerName, totalPrice, description, paymentStatus, orderId], (err, result) => {
        if (err) {
            console.error('Error updating order:', err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        if (result.affectedRows > 0) {
            return res.json({ success: true, message: 'Order updated successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
    });
});

// DELETE ลบคำสั่งซื้อ
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM order_items WHERE order_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('เกิดข้อผิดพลาดในการลบรายการสินค้า');
        }

        db.query('DELETE FROM orders WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).send('เกิดข้อผิดพลาดในการลบคำสั่งซื้อ');
            }
            res.json({ message: 'ลบคำสั่งซื้อสำเร็จ' });
        });
    });
});

module.exports = router;
