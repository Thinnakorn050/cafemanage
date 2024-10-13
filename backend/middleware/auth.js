const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models/db');
const router = express.Router();

// POST register
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: "Username, email, password, and role are required." });
    }

    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).send(err);

            if (results.length > 0) {
                return res.status(400).json({ error: "Email is already in use." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                [username, email, hashedPassword, role],
                (err, results) => {
                    if (err) return res.status(500).send(err);
                    res.status(201).json({ message: "User registered successfully." });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

// POST login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Please provide username and password." });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error("Database error:", err); // Log the database error
            return res.status(500).send(err);
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const user = results[0];
        try {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid credentials." });
            }

            // Log the user information
            console.log("User logged in:", user); // Log user information for debugging
            
            // ส่ง role กลับไปด้วยใน response
            res.status(200).json({ 
                message: "Login successful", 
                userId: user.id, 
                role: user.role // เพิ่ม role ที่นี่
            });
        } catch (error) {
            console.error("Error during password comparison:", error); // Log the error
            return res.status(500).json({ error: "Internal server error." });
        }
    });
});

module.exports = router;
