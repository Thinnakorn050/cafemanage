const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all menu items
router.get('/', (req, res) => {
    db.query('SELECT * FROM menu_items', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST new menu item
router.post('/', (req, res) => {
    const { name, description, price } = req.body; // Getting data from request body
    db.query(
      'INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)',
      [name, description, price],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({
          id: results.insertId,
          name,
          description,
          price,
        }); // Return the added product
      }
    );
  });

// PUT update menu item
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    db.query('UPDATE menu_items SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?', [name, description, price, stock, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Menu item updated successfully.' });
    });
});

// DELETE menu item
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('DELETE FROM menu_items WHERE id = ?', [id], (err, results) => {
//         if (err) return res.status(500).send(err);
//         res.json({ message: 'Menu item deleted successfully.' });
//     });
// });
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // First, delete related order_items
    db.query('DELETE FROM order_items WHERE menu_item_id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting related order items:', err); // Log the error
            return res.status(500).send({ error: 'Failed to delete related order items' });
        }

        // Then, delete the menu item
        db.query('DELETE FROM menu_items WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Error deleting menu item:', err); // Log the error
                return res.status(500).send({ error: 'Failed to delete menu item' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Menu item not found' });
            }

            res.json({ message: 'Menu item deleted successfully.' });
        });
    });
});


module.exports = router;
