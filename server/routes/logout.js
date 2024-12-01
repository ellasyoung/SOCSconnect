const express = require('express');
const Sessions = require('../models/Sessions');
const router = express.Router();

router.post('/', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(400).json({ message: 'Token missing' });

    try {
        await Sessions.findOneAndDelete({ token });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
