// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register user in MongoDB
router.post('/register', async (req, res) => {
    const { name, email, firebaseId } = req.body;
  
    try {
      // Check if the user already exists in MongoDB
      const existingUser = await User.findOne({ firebaseId });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create new user in MongoDB
      const newUser = new User({
        name,
        email,
        firebaseId,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('MongoDB Registration Error:', err);
      res.status(500).json({ error: 'Failed to register user' });
    }
  });
  

// router.get('/', async (req, res) => {
//     // const { name, email, firebaseId } = req.body;

//     res.status(200).json({message: "Returedn nidely"})

//     // try {
//     //     const newUser = new User({ name, email, firebaseId });
//     //     await newUser.save();
//     //     res.status(201).json({ msg: 'User registered successfully' });
//     // } catch (err) {
//     //     console.error(err);
//     //     res.status(500).json({ msg: 'Error registering user' });
//     // }
// });

module.exports = router;
