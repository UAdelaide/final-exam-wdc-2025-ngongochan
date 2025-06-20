const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);















// testing login and logout
app.use(session({
  secret: 'mysecret',
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

// LOG IN
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.execute(
            'SELECT * FROM Users WHERE username = ? AND password_hash = ?',
            [username, password]
        );
if (rows.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    const user = rows[0];    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});










// Export the app instead of listening here
module.exports = app;