const db = require('./db');

const Menu = {
    getAllMenuItems: (callback) => {
        db.query('SELECT * FROM menu_items', callback); // Changed to menu_items
    },
    createMenuItem: (name, description, price, callback) => {
        db.query('INSERT INTO menu_items (name, description, price) VALUES (?, ?, ?)', [name, description, price], callback); // Changed to menu_items
    },
    updateMenuItem: (id, name, description, price, callback) => {
        db.query('UPDATE menu_items SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id], callback); // Changed to menu_items
    },
    deleteMenuItem: (id, callback) => {
        db.query('DELETE FROM menu_items WHERE id = ?', [id], callback); // Changed to menu_items
    }
};

module.exports = Menu;
