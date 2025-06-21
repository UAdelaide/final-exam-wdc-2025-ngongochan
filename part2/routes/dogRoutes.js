const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /api/dogs - return ALL dogs
router.get('/', async (req, res) => {
  try {
    const [dogs] = await db.execute('SELECT * FROM Dogs');
    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;
