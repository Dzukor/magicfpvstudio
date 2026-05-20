const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  try {
    const { name, surname, company, phone, email, message } = req.body;
    if (!name || !surname || !company || !phone || !email || !message) {
      return res.status(400).json({ error: 'missing fields' });
    }
    const [result] = await pool.query(
      'INSERT INTO orders (name, surname, company, phone, email, message) VALUES (?, ?, ?, ?, ?, ?)',
      [name, surname, company, phone, email, message]
    );
    const id = result.insertId;
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'not found' });
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body; // expect boolean
    if (typeof status !== 'boolean') return res.status(400).json({ error: 'status boolean required' });
    let query = 'UPDATE orders SET status = ?';
    const params = [status ? 1 : 0];
    if (status) {
      query += ', ended_at = CURRENT_TIMESTAMP';
    } else {
      query += ', ended_at = NULL';
    }
    query += ' WHERE id = ?';
    params.push(req.params.id);
    await pool.query(query, params);
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
