const db = require('./db');
const bcrypt = require('bcrypt');

const User = {
    getAllUsers: (callback) => {
        db.query('SELECT id, username, role, email FROM users', callback);
    },
    createUser: async (username, email, password, role, callback) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, role], callback);
    },
    updateUser: (id, username, email, role, callback) => {
        db.query('UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?', [username, email, role, id], callback);
    },
    deleteUser: (id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    },
    getUserById: (id, callback) => {
        db.query('SELECT id, username, email, role FROM users WHERE id = ?', [id], callback);
    }
};

module.exports = User;
