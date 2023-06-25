const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const connection = mysql.createConnection({
    host: 'localhost',
    port: 1433,
    user: 'host1',
    password: 'host1',
    database: 'DASHBOARD',
  });
  
  // Connect to MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });
  
  // Endpoint to create a new item
app.post('/items', (req, res) => {
const newItem = req.body;

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }

    // Perform the database query to save the item
    connection.query('INSERT INTO items SET ?', newItem, (err, result) => {
    connection.release();

    if (err) {
        console.error('Error saving item to the database:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }

    // Return a response indicating the item was created
    res.status(201).json({ message: 'Item created successfully' });
    });
});
});
  
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});