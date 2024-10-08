const db = require('./db');

const User = {
    getAllUsers: (callback) => {
        db.query('SELECT id, username, role FROM users', callback);
    },
    createUser: (username, password, role, callback) => {
        db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], callback);
    },
    updateUser: (id, username, role, callback) => {
        db.query('UPDATE users SET username = ?, role = ? WHERE id = ?', [username, role, id], callback);
    },
    deleteUser: (id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    }
};

module.exports = User;
