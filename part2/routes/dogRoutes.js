const express = require('express');
const router = express.Router();
const db = require('../models/db'); // adjust if needed

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

router.get('/owned', async (req, res) => {
  const ownerId = req.session.user_id;
  if (!ownerId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  try {
    const [dogs] = await db.execute(
      'SELECT dog_id, name FROM Dogs WHERE owner_id = ?',
      [ownerId]
    );
    res.json(dogs);
  } catch (err) {
    console.error('SQL Error:', err);
    res.status(500).json({ error: 'Failed to fetch owned dogs' });
  }
});

module.exports = router;
