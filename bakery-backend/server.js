require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});



// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Admin Registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        await pool.query("INSERT INTO admins (username, password) VALUES (?, ?)", [username, hashedPassword]);
        res.json({ message: "Admin registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM admins WHERE username = ?", [username]);
    if (rows.length === 0) return res.status(401).json({ error: "Invalid username or password" });

    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign({ id: rows[0].id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
});

// Post Announcements
app.post('/api/announcements', async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ error: "Title and body are required." });
    }

    try {
        const [result] = await pool.query("INSERT INTO announcements (title, body) VALUES (?, ?)", [title, body]);
        res.json({ id: result.insertId, message: "Announcement created successfully!" });
    } catch (err) {
        console.error("Error inserting announcement:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get Announcements
app.get('/api/announcements', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM announcements ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching announcements:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete an Announcement
app.delete('/api/announcements/:id', async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM announcements WHERE id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Announcement not found." });
        }

        res.json({ message: "Announcement deleted successfully" });
    } catch (err) {
        console.error("Error deleting announcement:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Schedule Pickup
app.post('/api/pickups', async (req, res) => {
    const { last_name, email, pickup_date, callback_number, items } = req.body;
    
    try {
        await pool.query(
            "INSERT INTO pickups (last_name, email, pickup_date, callback_number, items) VALUES (?, ?, ?, ?, ?)", 
            [last_name, email, pickup_date, callback_number, JSON.stringify(items)]
        );
        res.json({ message: "Pickup scheduled successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Pickup Orders
app.get('/api/pickups', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM pickups ORDER BY pickup_date DESC");
        res.json(rows);
    } catch (err) {
        console.error("Error fetching pickups:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a Scheduled Pickup
app.delete('/api/pickups/:id', async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM pickups WHERE id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Pickup not found." });
        }

        res.json({ message: "Pickup deleted successfully" });
    } catch (err) {
        console.error("Error deleting pickup:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Delete Pickup Orders Older Than 12 Hours
cron.schedule('0 * * * *', async () => {
    try {
        await pool.query("DELETE FROM pickups WHERE TIMESTAMPDIFF(HOUR, created_at, NOW()) > 12");
        console.log("Old pickup orders deleted.");
    } catch (err) {
        console.error("Error deleting old orders:", err);
    }
});

const PORT = process.env.PORT || 5015;
app.listen(5015, '0.0.0.0', () => console.log("Server running on port 5015"));