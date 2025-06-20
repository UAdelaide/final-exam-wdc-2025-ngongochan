// routes/dogs.js
const express = require('express');

module.exports = function(db) {
  const router = express.Router();

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

  return router;
};
