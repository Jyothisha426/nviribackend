// server.js (Updated)
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'JYO_secret_key'; 

app.use(cors());
app.use(express.json());

// Utility function to generate JWT
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

// Register User
app.post('/register/user', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hashedPassword], function(err) {
            if (err) {
                return res.status(500).json({ error: 'User already exists or database error' });
            }

            const token = generateToken({ id: this.lastID, email });
            res.status(201).json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login User
app.post('/login/user', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ token });
    });
});

// Register Technician
app.post('/register/technician', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(`INSERT INTO technicians (email, password, name) VALUES (?, ?, ?)`, [email, hashedPassword, name], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Technician already exists or database error' });
            }

            const token = generateToken({ id: this.lastID, email });
            res.status(201).json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Technician
app.post('/login/technician', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM technicians WHERE email = ?`, [email], async (err, technician) => {
        if (err || !technician) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, technician.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(technician);
        res.status(200).json({ token });
    });
});


app.get('/locations', (req, res) => {
    db.all('SELECT * FROM locations', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Endpoint to get appliance types
app.get('/appliance-types', (req, res) => {
    db.all('SELECT * FROM appliance_types', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Endpoint to get featured technicians
app.get('/technicians', (req, res) => {
    db.all('SELECT * FROM technicians', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


exports.default=app;