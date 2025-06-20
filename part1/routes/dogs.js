const express = require('express');
var router = express.Router();

// "dog_name": "Max",
// "size": "medium",
// "owner_username": "alice123"
router.get('/api/dogs', async function(req, res) {
    try {
        let [dogs] = await db.query("SELECT * FROM Dogs;");
        let [users] = await db.query("SELECT * FROM Users;");
        if (email) {
            [users] = await db.query("SELECT * FROM users WHERE email LIKE ?;", [`%${email}%`]);
        }
        if (title) {
            [events] = await db.query("SELECT * FROM events WHERE title LIKE ?;", [`%${title}%`]);
        }
        res.render('admin', {
            users: users,
        });
    } catch(err) {
        res.status(404)
    }
});