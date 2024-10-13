const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET ค้นหารายการสินค้าผ่าน menu_item_id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT 
            menu_items.id AS menu_item_id,
            menu_items.name AS menu_name,
            menu_items.price AS menu_price,
            order_items.quantity AS quantity
        FROM 
            order_items
        JOIN 
            menu_items ON order_items.menu_item_id = menu_items.id
        WHERE 
            menu_items.id = ?;
    `;

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) {
            return res.status(404).json({ error: "ไม่พบรายการสินค้าที่มี id นี้" });
        }
        res.json(results);
    });
});

module.exports = router;
