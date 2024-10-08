// orderModel.js
const db = require('../models/db'); // เชื่อมต่อฐานข้อมูล

const Order = {
    getAllOrders: (query, queryParams, callback) => {
        db.query(query, queryParams, (err, results) => {
            callback(err, results);
        });
    },

    createOrder: (user_id, total_price, callback) => {
        const query = 'INSERT INTO orders (user_id, total_price) VALUES (?, ?)';
        db.query(query, [user_id, total_price], (err, results) => {
            callback(err, results);
        });
    },

    updateOrder: (id, total_price, payment_status, callback) => {
        const query = 'UPDATE orders SET total_price = ?, payment_status = ? WHERE id = ?';
        db.query(query, [total_price, payment_status, id], (err, results) => {
            callback(err, results);
        });
    },

    deleteOrder: (id, callback) => {
        const query = 'DELETE FROM orders WHERE id = ?';
        db.query(query, [id], (err, results) => {
            callback(err, results);
        });
    }
};

module.exports = Order;
