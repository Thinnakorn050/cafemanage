const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt');

// GET all users
router.get('/', (req, res) => {
    db.query('SELECT id, username, role, email FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// GET a user by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT id, username, role, email FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(results[0]);
    });
});

// POST new user
router.post('/', async (req, res) => {
    const { username, password, role, email } = req.body;

    if (!username || !password || !role || !email) {
        return res.status(400).json({ error: "Please provide username, password, role, and email." });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, role], (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: results.insertId, username, email, role });
        });
    });
});

// PUT update user
router.put('/:id', (req, res) => {
    const { username, email, role } = req.body;
    const { id } = req.params;

    if (!username || !email || !role) {
        return res.status(400).json({ error: "Please provide username, email, and role." });
    }

    db.query('SELECT * FROM users WHERE email = ? AND id != ?', [email, id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            return res.status(400).json({ error: "Email already exists for another user." });
        }

        db.query('UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?',
            [username, email, role, id],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ message: "User updated successfully" });
            }
        );
    });
});

// DELETE user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'User deleted successfully.' });
    });
});

module.exports = router;
