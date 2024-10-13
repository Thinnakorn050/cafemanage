const User = require('../models/userModel');

const userController = {
    getAllUsers: (_req, res) => {
        User.getAllUsers((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    },
    createUser: (req, res) => {
        const { username, email, password, role } = req.body; // แก้เป็น username

        if (!username || !email || !password || !role) {
            return res.status(400).json({ error: "Please provide username, email, password, and role." });
        }

        User.createUser(username, email, password, role, (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: results.insertId, username, email, role });
        });
    },
    updateUser: (req, res) => {
        const { username, email, role } = req.body; // แก้เป็น username
        const { id } = req.params;

        if (!username || !email || !role) {
            return res.status(400).json({ error: "Please provide username, email, and role." });
        }

        User.updateUser(id, username, email, role, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: "User updated successfully" });
        });
    },
    getUserById: (req, res) => {
        const { id } = req.params;

        User.getUserById(id, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(results[0]);
        });
    },
    deleteUser: (req, res) => {
        const { id } = req.params;
        User.deleteUser(id, (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'User deleted successfully.' });
        });
    }
};

module.exports = userController;
