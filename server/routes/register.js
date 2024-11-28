const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/Users'); 
const router = express.Router();

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error occurred during user registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
