const User = require('../models/userModel');

const userController = {
    getAllUsers: (_req, res) => {
        User.getAllUsers((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    },
    createUser: (req, res) => {
        const { name, email,password, role } = req.body;
        User.createUser(name, email,password, role, (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: results.insertId, name, role });
        });
    },
    updateUser: (req, res) => {
        const { id } = req.params;
        const { name, role } = req.body;
        User.updateUser(id, name,email, role, (err, results) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'User updated successfully.' });
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
