require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');

app.use('/auth', authRoutes);
app.use('/orders', ordersRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
