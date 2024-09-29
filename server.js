const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost', // Your database host
    user: 'HIRA', // Your database username
    password: '', // Your database password
    database: 'my_database' // Your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// CRUD Operations
// Get all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// Add a product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    db.query('INSERT INTO products SET ?', newProduct, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json({ id: result.insertId, ...newProduct });
    });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    db.query('DELETE FROM products WHERE id = ?', [productId], (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(204).send();
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

