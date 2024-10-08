const Menu = require('../models/menuModel');

const menuController = {
    getAllMenuItems: (req, res) => {
        Menu.getAllMenuItems((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    },
    createMenuItem: (req, res) => {
        const { name, description, price, stock } = req.body;
        Menu.createMenuItem(name, description, price, stock, (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: results.insertId, name, description, price, stock });
        });
    },
    updateMenuItem: (req, res) => {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        Menu.updateMenuItem(id, name, description, price, stock, (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Menu item updated successfully.' });
        });
    },
    deleteMenuItem: (req, res) => {
        const { id } = req.params;
        Menu.deleteMenuItem(id, (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Menu item deleted successfully.' });
        });
    }
};

module.exports = menuController;
