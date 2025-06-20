const express = require('express');
var router = express.Router();
var db = require('../db/db');

// /api/walkers/summary
// (walker_username, total_ratings, average_rating, completed_walks)
router.get('/', async function(req, res) {
    try {
        const [results] = await db.query(`
        SELECT
            u.username AS walker_username,
            COUNT(wr.rating_id) AS total_ratings,
            AVG(wr.rating) AS average_rating,
            SUM(CASE WHEN wrq.status = 'completed' THEN 1 ELSE 0 END) AS completed_walks
        FROM Users u
        LEFT JOIN WalkRatings wr ON u.user_id = wr.walker_id
        LEFT JOIN WalkRequests wrq ON wr.request_id = wrq.request_id
        WHERE u.role = 'walker'
        GROUP BY u.user_id;
        `);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch walkers' });
    }
});

module.exports = router;
