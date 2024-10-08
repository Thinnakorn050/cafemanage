const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET order by ID (รวมรายการสินค้า)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('Order ID:', id);  // ตรวจสอบค่า id ที่รับมา

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
        JOIN 
            order_items ON orders.id = order_items.order_id
        JOIN 
            menu_items ON order_items.menu_item_id = menu_items.id
        WHERE 
            orders.id = ?;
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err); // ส่ง error แล้วหยุดการทำงาน
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "ไม่พบข้อมูลคำสั่งซื้อ" }); // ส่งข้อมูล "ไม่พบข้อมูล" แล้วหยุดการทำงาน
        }
        res.json(results); // ส่งผลลัพธ์คำสั่งซื้อกลับ
    });
});

// POST สร้างคำสั่งซื้อใหม่ (สร้าง order และเพิ่มรายการใน order_items)
router.post('/', (req, res) => {
    const { user_id, total_price, order_items } = req.body;

    // ตรวจสอบว่ามี user_id, total_price และ order_items
    if (!user_id || !total_price || !order_items || order_items.length === 0) {
        return res.status(400).json({ message: 'user_id, total_price และ order_items เป็นข้อมูลที่จำเป็น' });
    }

    // สร้างคำสั่งซื้อใหม่
    db.query('INSERT INTO orders (user_id, total_price, payment_status) VALUES (?, ?, ?)', [user_id, total_price, 'pending'], (err, results) => {
        if (err) {
            return res.status(500).send(err); // ส่ง error แล้วหยุดการทำงาน
        }

        const order_id = results.insertId; // ได้ ID ของคำสั่งซื้อใหม่

        // เพิ่มรายการสินค้าใน order_items
        const orderItemsQuery = 'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ?';
        const orderItemsValues = order_items.map(item => [order_id, item.menu_item_id, item.quantity, item.price]);

        db.query(orderItemsQuery, [orderItemsValues], (err, results) => {
            if (err) {
                return res.status(500).send(err); // ส่ง error แล้วหยุดการทำงาน
            }
            res.status(201).json({ order_id, user_id, total_price, order_items });
        });
    });
});

// PUT อัปเดตคำสั่งซื้อ
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { total_price, payment_status, order_items } = req.body;

    // อัปเดตคำสั่งซื้อ
    db.query('UPDATE orders SET total_price = ?, payment_status = ? WHERE id = ?', [total_price, payment_status, id], (err, results) => {
        if (err) {
            return res.status(500).send(err); // ส่ง error แล้วหยุดการทำงาน
        }

        // อัปเดตหรือเพิ่มรายการสินค้าใน order_items
        if (order_items && order_items.length > 0) {
            // ลบรายการเก่าใน order_items ก่อน
            db.query('DELETE FROM order_items WHERE order_id = ?', [id], (err, results) => {
                if (err) {
                    return res.status(500).send(err); // ส่ง error แล้วหยุดการทำงาน
                }

                // เพิ่มรายการใหม่ใน order_items
                const orderItemsQuery = 'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES ?';
                const orderItemsValues = order_items.map(item => [id, item.menu_item_id, item.quantity, item.price]);

                db.query(orderItemsQuery, [orderItemsValues], (err, results) => {
                    if (err) {
                        return res.status(500).send(err); // ส่ง error แล้วหยุดการทำงาน
                    }
                    res.json({ message: 'คำสั่งซื้ออัปเดตสำเร็จ' });
                });
            });
        } else {
            res.json({ message: 'คำสั่งซื้ออัปเดตสำเร็จ' });
        }
    });
});

// DELETE ลบคำสั่งซื้อ
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // ลบรายการใน order_items ก่อน
    db.query('DELETE FROM order_items WHERE order_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err); // ส่ง error แล้วหยุดการทำงาน
        }

        // ลบคำสั่งซื้อ
        db.query('DELETE FROM orders WHERE id = ?', [id], (err, results) => {
            if (err) {
                return res.status(500).send(err); // ส่ง error แล้วหยุดการทำงาน
            }
            res.json({ message: 'คำสั่งซื้อลบสำเร็จ' });
        });
    });
});

module.exports = router;
