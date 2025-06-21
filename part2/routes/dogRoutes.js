// const express = require('express');
// const router = express.Router();
// const db = require('../models/db');
// const fetch = require('node-fetch');
// // GET /api/dogs - return ALL dogs with random photos
// router.get('/', async (req, res) => {
//   try {
//     const [dogs] = await db.execute('SELECT * FROM Dogs');

//     // attach a random image to each dog
//     const dogsWithImages = await Promise.all(
//       dogs.map(async (dog) => {
//         try {
//           const response = await fetch('https://dog.ceo/api/breeds/image/random');
//           const data = await response.json();
//           dog.photo = data.message;
//         } catch (err) {
//           console.error('Failed to fetch image for dog:', dog.dog_id);
//           dog.photo = null;
//         }
//         return dog;
//       })
//     );

//     res.json(dogsWithImages);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch dogs' });
//   }
// });

// module.exports = router;

