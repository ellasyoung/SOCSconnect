//Cienna Gin-Naccarato & Ella Young
const mongoose = require('mongoose');
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
            return res.status(200).json({ firstName: "Unregistered User", lastName: email });
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
        const objectId = new mongoose.Types.ObjectId(userId);

        const user = await Users.findById(objectId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);

        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        res.status(500).json({ message: 'Internal server error', error });
    }
});

router.get('/user-email/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const objectId = new mongoose.Types.ObjectId(userId);

        const user = await Users.findById(objectId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            email: user.email,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);

        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;

