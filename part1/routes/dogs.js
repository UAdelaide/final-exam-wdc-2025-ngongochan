const express = require('express');
var router = express.Router();

// "dog_name": "Max",
// "size": "medium",
// "owner_username": "alice123"
router.get('/api/dogs', async function(req, res) {
    try {
        const email = req.query.email;
        console.log(email);
        let [dogs] = await db.query("SELECT * FROM users;");
        let [events] = await db.query("SELECT * FROM events;");
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
        res.render('error');
    }
});