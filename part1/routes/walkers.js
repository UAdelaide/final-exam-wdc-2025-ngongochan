const express = require('express');
var router = express.Router();
var db = require('../db/db');

// /api/dogs route  (dog_name, size, owner_username)

"request_id": 1,
    "dog_name": "Max",
    "requested_time": "2025-06-10T08:00:00.000Z",
    "duration_minutes": 30,
    "location": "Parklands",
    "owner_username": "alice123"

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
        res.status(500).json({ error: 'Failed to fetch walkers' });
    }
});

module.exports = router;
