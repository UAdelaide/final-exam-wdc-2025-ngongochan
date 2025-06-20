const express = require('express');
var router = express.Router();
var db = require('../db/db');

// /api/walkers/summary
// (walker_username, total_ratings, average_rating, completed_walks)
router.get('/', async function(req, res) {
    try {
        const [results] = await db.query(`
        SELECT
            WalkRequests.request_id,
            Dogs.name AS dog_name,
            WalkRequests.requested_time,
            WalkRequests.duration_minutes,
            WalkRequests.location,
            Users.username AS owner_username
        FROM WalkRequests
        JOIN Dogs ON Dogs.dog_id = WalkRequests.dog_id
        JOIN Users ON Dogs.owner_id = Users.user_id
        `);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch walkers' });
    }
});

module.exports = router;
