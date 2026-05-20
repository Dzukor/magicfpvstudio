const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

if (!process.env.JWT_SECRET) {
  console.error('BŁĄD: Zmienna środowiskowa JWT_SECRET nie jest ustawiona!');
  process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });

    const [rows] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (rows.length) return res.status(400).json({ error: 'username already exists' });

    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
    const userId = result.insertId;
    const token = jwt.sign({ id: userId, username }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });

    const [rows] = await pool.query('SELECT id, username, password FROM users WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ error: 'invalid credentials' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

router.post('/change-password', async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ error: 'username, oldPassword and newPassword required' });
    }

    const [rows] = await pool.query('SELECT id, password FROM users WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ error: 'user not found' });

    const user = rows[0];
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) return res.status(401).json({ error: 'invalid old password' });

    const newHash = await bcrypt.hash(newPassword, 12);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [newHash, user.id]);
    return res.json({ message: 'password changed successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
