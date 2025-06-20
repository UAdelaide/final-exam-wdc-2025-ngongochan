const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
var mysql = require('mysql2/promise');
require('dotenv').config();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// var db = require('../part1/db/db');
var db = require('./models/db');

(async () => {
  try {
    // connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      socketPath: '/var/run/mysqld/mysqld.sock',
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });

    // create the database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
    await connection.end();

    // connect to the created database
    db = await mysql.createConnection({
      socketPath: '/var/run/mysqld/mysqld.sock',
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });

    // create a table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS Dogs (
        dog_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        size ENUM('small', 'medium', 'large') NOT NULL
      )
    `);

    // insert data if table is empty
    const [rows] = await db.execute('SELECT COUNT(*) AS count FROM Dogs');
    if (rows[0].count === 0) {
      await db.execute(`
        INSERT INTO Dogs (name, size) VALUES
        (  'Max',  'medium'),
        (  'Bella',  'small'),
        (  'Toro',  'large'),
        (  'Min',  'small'),
        (  'Noel',  'large')
      `);
    }
  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

// routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dogs', dogRoutes);

// SESSION
app.use(session({
  secret: 'mysecret',
  cookie: {
    maxAge: 60 * 1000
  }
}));

// LOG IN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // debugging SQL NULL parameters
  console.log('request body:', req.body);
  if (typeof username === 'undefined' || typeof password === 'undefined') {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM Users WHERE username = ? AND password_hash = ?',
      [username, password]
    );
    if (rows.length === 0) {
      return res.status(401).send('Invalid username or password');
    }
    const user = rows[0];

    req.session.user_id = user.user_id;
    req.session.role = user.role;

    // redirect based on the user's role
    if (user.role === 'owner') {
      // app.use(express.static(path.join(__dirname, '/public')));
      // pay attention to the path, DO NOT include /public!!
      res.redirect('/owner-dashboard.html');
    } else if (user.role === 'walker') {
      res.redirect('/walker-dashboard.html');
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// LOG OUT
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out!' });
  });
});


// export the app instead of listening
module.exports = app;
