const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('database.db')
const sqlite3 = require('sqlite3');
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
// Create the table
const createTable = () => {
  const sql = `
      CREATE TABLE IF NOT EXISTS todo (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           title TEXT NOT NULL,
           description  TEXT NOT NULL,
           priority TEXT NOT NULL
      )
  `;
  db.prepare(sql).run();
};
createTable();
// Insert a new user
app.post('/todo', (req, res) => {
  const { title, description, priority } = req.body;
  const insertStatement = db.prepare(
    'INSERT INTO todo (title, description, priority) VALUES (?, ?, ?)'
  );
  insertStatement.run(title, description, priority);
  // Run the SQL statement with the provided values
  // db.run(sql, [title, description, priority], (err) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).json({ error: 'Failed to add todo' });
  //   } else {
  //     res.status(201).json({ message: 'Todo added successfully' });
  //     db.run('COMMIT'); // Commit the transaction
  //   }
  // });
});
// Get all users
app.get('/todo', (req, res) => {
  const sql = `
      SELECT * FROM todo
  `;
  const rows = db.prepare(sql).all();
  res.json(rows);
});
// Get a user by id
app.get('/todo/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
      SELECT * FROM todo
      WHERE id = ?
  `;
  const row = db.prepare(sql).get(id);
  if (row) {
      res.json(row);
  } else {
      res.status(404).json({ error: 'Todo not found' });
  }
});
// Update a user by id
app.put('/todo/:id', (req, res) => {
  const { id } = req.params;
  const {title, description, priority  } = req.body;
  const sql = `
      UPDATE todo
      SET title = ?, description = ?, priority = ?
      WHERE id = ?
  `;
  const info = db.prepare(sql).run(title, description,priority, id);
  if (info.changes > 0) {
      res.json({ message: 'todo updated successfully' });
  } else {
      res.status(404).json({ error: 'todo not found' });
  }
});
// Delete a user by id
app.delete('/todo/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
      DELETE FROM todo
      WHERE id = ?
  `;
  const info = db.prepare(sql).run(id);
  if (info.changes > 0) {
      res.json({ message: 'User deleted successfully' });
  } else {
      res.status(404).json({ error: 'User not found' });
  }
});
//   Create the users table
// Create the users table


const createUserTable = () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS register (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `;
    db.prepare(sql).run();
  };
  createUserTable();
// Register a new user
app.post('/register', (req, res) => {
  const { name, phoneNumber, username, password } = req.body;
  console.log('Register request received:', { name, phoneNumber, username, password });

  if (!name || !phoneNumber || !username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `
    INSERT INTO register (name, phoneNumber, username, password)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const insertStatement = db.prepare(sql);
    insertStatement.run(name, phoneNumber, username, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/register', async (req, res) => {
  const { name, phoneNumber, username, password } = req.body;

 // Check if user already exists
 const existingUser = db.prepare('SELECT * FROM register WHERE username = ?').get(username);
 if (existingUser) {
   return res.status(409).json({ error: 'User already registered' });
 }

 // Insert new user
 const sql = 'INSERT INTO register (name, phoneNumber, username, password) VALUES (?, ?, ?, ?)';
 try {
   db.prepare(sql).run(name, phoneNumber, username, password);
   res.status(201).json({ message: 'User registered successfully' });
 } catch (error) {
   console.error('Database error:', error);
   res.status(500).json({ error: 'Failed to register user' });
 }
});
//get
  // Get all users
app.get('/register', (req, res) => {
    const sql = `
        SELECT * FROM register
    `;
    const rows = db.prepare(sql).all();
    res.json(rows);
});

// Get a user by id
app.get('/register/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT * FROM register
        WHERE id = ?
    `;
    const row = db.prepare(sql).get(id);
    if (row) {
        res.json(row);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


// Function to check table schema
const checkTableSchema = () => {
    const tableInfo = db.prepare('PRAGMA table_info(register);').all();
    console.log('Table Schema:', tableInfo);
  };
  
  // Call the function to check schema
  checkTableSchema();

//login 
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    // Here, add logic to verify username and password with your database
    // Example: 
    const sql = 'SELECT * FROM register WHERE username = ? AND password = ?';
    const user = db.prepare(sql).get(username, password);
  
    if (user) {
      // Successful login
      res.status(200).json({ message: 'Login successful', user });
    } else {
      // Login failed
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
//end of login  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});