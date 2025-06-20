const express = require('express');
var router = express.Router();

// "dog_name": "Max",
// "size": "medium",
// "owner_username": "alice123"
router.get('/api/dogs', async function(req, res) {
    try {
        let [dogs] = await db.query("SELECT * FROM Dogs;");
        let [users] = await db.query("SELECT * FROM Users;");
        let dogsResponse;

        res.json(dogsResponse);
    } catch(err) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});
