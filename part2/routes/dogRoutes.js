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


const express = require('express');
const router = express.Router();
const db = require('../models/db');
const fetch = require('node-fetch'); // Needed for external API call

// GET /api/dogs - return only dogs for the logged-in user, with images
router.get('/', async (req, res) => {
  const ownerID = req.session?.user_id;

  // if (!ownerID) {
  //   return res.status(401).json({ error: 'Not logged in' });
  // }

  try {
    const [dogs] = await db.execute('SELECT * FROM Dogs WHERE owner_id = ?', [ownerID]);

    // Fetch and attach random image to each dog
    const dogsWithImages = await Promise.all(
      dogs.map(async (dog) => {
        try {
          const response = await fetch('https://dog.ceo/api/breeds/image/random');
          const data = await response.json();
          dog.photo = data.message;
        } catch {
          dog.photo = null;
        }
        return dog;
      })
    );

    res.json(dogsWithImages);
  } catch (err) {
    console.error('Failed to fetch dogs:', err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;
