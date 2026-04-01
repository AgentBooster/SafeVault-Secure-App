const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const xss = require('xss');
const { body, validationResult } = require('express-validator');

// Assuming db is injected or imported
const db = require('./database');

const app = express();
app.use(express.json());

const JWT_SECRET = 'super-secret-key-for-testing'; // In production, use environment variables

// Activity 1 & 2: Secure Registration (Input Validation + Parameterized Query + Bcrypt)
app.post('/auth/register', [
    // Input validation
    body('username').isAlphanumeric().withMessage('Username must be alphanumeric').notEmpty(),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { username, email, password, role } = req.body;
    
    // Default role
    if (!role) role = 'user';

    try {
        // Activity 2: Hash password securely
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Activity 1 & 3: Parameterized Query (prevents SQL Injection)
        const sql = `INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)`;
        db.run(sql, [username, email, passwordHash, role], function(err) {
            if (err) {
                return res.status(400).json({ error: 'User already exists or database error' });
            }
            res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Activity 2: Authentication (Login)
app.post('/auth/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Parameterized Query to prevent SQL Injection
    const sql = `SELECT * FROM users WHERE username = ?`;
    db.get(sql, [username], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
});

// Middleware for Authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Activity 2: RBAC - Restrict to Admin
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: 'Access denied: Requires ' + role + ' role' });
        }
        next();
    };
};

app.get('/api/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin panel' });
});

// Activity 1 & 3: XSS Prevention
app.post('/api/messages', authenticateToken, [
    body('content').notEmpty().withMessage('Message content required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Sanitize input to prevent XSS
    const sanitizedContent = xss(req.body.content);

    const sql = `INSERT INTO messages (content) VALUES (?)`;
    db.run(sql, [sanitizedContent], function(err) {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ message: 'Message created', messageId: this.lastID, content: sanitizedContent });
    });
});

app.get('/api/messages', (req, res) => {
    db.all(`SELECT * FROM messages`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(rows);
    });
});

module.exports = app;
