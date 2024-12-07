// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// Register user in MongoDB
router.post('/', async (req, res) => {
    const { name, email, firebaseId } = req.body;

    try {
        const newUser = new User({ name, email, firebaseId });
        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error registering user' });
    }
});

module.exports = router;
