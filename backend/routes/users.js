const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt');

// GET all users
router.get('/', (req, res) => {
    db.query('SELECT id, name, role,email FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});
// GET a user by ID or Email
router.get('/:id', (req, res) => {
    const { id } = req.params;

    // ค้นหาผู้ใช้ตาม id
    db.query('SELECT id, name, role, email FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(results[0]);
    });
});

// POST new user
router.post('/', async (req, res) => {
    const { name, password, role, email } = req.body; // ใช้ name แทน username

    // ตรวจสอบข้อมูลที่รับมาว่ามีค่า
    if (!name || !password || !role || !email) {
        return res.status(400).json({ error: "Please provide name, password, role, and email." });
    }

    // ตรวจสอบว่าอีเมลซ้ำไหม
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            return res.status(400).json({ error: "Email already exists." });
        }

        // ถ้าไม่มีอีเมลซ้ำ ทำการแฮชรหัสผ่านแล้วบันทึกข้อมูล
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role], (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(201).json({ id: results.insertId, name, email, role });
        });
    });
});

// PUT update user
router.put('/:id', (req, res) => {
    const { name, email, role } = req.body; // รับค่าจาก req.body
    const { id } = req.params; // รับค่า id จาก URL parameters

    // ตรวจสอบว่ามีค่าทั้งหมดหรือไม่
    if (!name || !email || !role) {
        return res.status(400).json({ error: "Please provide name, email, and role." });
    }

    // ตรวจสอบว่าอีเมลซ้ำไหมสำหรับการอัพเดต
    db.query('SELECT * FROM users WHERE email = ? AND id != ?', [email, id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            return res.status(400).json({ error: "Email already exists for another user." });
        }

        // ดำเนินการอัพเดตข้อมูลในฐานข้อมูล
        db.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
            [name, email, role, id],
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
