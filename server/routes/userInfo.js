const express = require('express');
const Users = require('../models/Users'); 
const router = express.Router();

router.get('/', async (req, res) => {
    const { email } = req.query; 
    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await Users.findOne({ email }, 'firstName lastName');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
