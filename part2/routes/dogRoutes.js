const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /api/dogs - return ALL dogs
router.get('/', async (req, res) => {
  try {
    const [dogs] = await db.execute('SELECT * FROM Dogs');
    res.json(dogs);
  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// /api/dogs route  (dog_name, size, owner_username)
router.get('/', async function(req, res) {
    try {
        const [results] = await db.query(`
        SELECT
            Dogs.name AS dog_name,
            Dogs.size,
            Users.username AS owner_username
        FROM Dogs
        JOIN Users ON Dogs.owner_id = Users.user_id
        `);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch dogs' });
    }
});



module.exports = router;
