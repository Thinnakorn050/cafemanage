const db = require('./db');

const Menu = {
    getAllMenuItems: (callback) => {
        db.query('SELECT * FROM menu', callback);
    },
    createMenuItem: (name, description, price, stock, callback) => {
        db.query('INSERT INTO menu (name, description, price, stock) VALUES (?, ?, ?, ?)', [name, description, price, stock], callback);
    },
    updateMenuItem: (id, name, description, price, stock, callback) => {
        db.query('UPDATE menu SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?', [name, description, price, stock, id], callback);
    },
    deleteMenuItem: (id, callback) => {
        db.query('DELETE FROM menu WHERE id = ?', [id], callback);
    }
};

module.exports = Menu;
