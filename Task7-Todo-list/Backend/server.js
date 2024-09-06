const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Create the table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    phoneNumber INTEGER,
    email TEXT UNIQUE,
    password TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  }
});

// Insert a new user
app.post('/register', (req, res) => {
  const { name, age, phoneNumber, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(`
    INSERT INTO users (name, age, phoneNumber, email, password)
    VALUES (?, ?, ?, ?, ?)
  `, [name, age, phoneNumber, email, hashedPassword], (err) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Failed to insert user' });
    } else {
      res.status(201).json({ message: 'User inserted successfully' });
    }
  });
});

// Get all users
app.get('/users', (req, res) => {
  db.all(`
    SELECT * FROM users
  `, (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    } else {
      res.json(rows);
    }
  });
});

// Add a new endpoint for login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`
    SELECT * FROM users
    WHERE email = ?
  `, [email], (err, row) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Failed to fetch user' });
    } else if (!row) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      const isValidPassword = bcrypt.compareSync(password, row.password);
      if (!isValidPassword) {
        res.status(401).json({ error: 'Invalid email or password' });
      } else {
        res.json({ message: 'Login successful' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});