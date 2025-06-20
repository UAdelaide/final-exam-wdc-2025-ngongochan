const express = require('express');
var router = express.Router();
var db = require('../db/db');

// /api/dogs route
// (request_id, dog_name, requested_time, duration_minutes, location, owner_username)
router.get('/', async function(req, res) {
    try {
        const [results] = await db.query(`
        SELECT
            WalkRequests.request_id AS request_id,
            WalkRequests.size,
            Users.username AS owner_username
        FROM WalkRequests
        JOIN Users ON Dogs.owner_id = Users.user_id
        `);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch walkers' });
    }
});

module.exports = router;
