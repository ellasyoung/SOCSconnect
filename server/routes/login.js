//Ella Young
const express = require('express');
const bcrypt = require('bcrypt');
const Sessions = require('../models/Sessions');
const Users = require('../models/Users');
const router = express.Router();

const generateToken = (length = 30) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
};


router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken();

        const session = new Sessions({
            userId: user._id,
            token,
        });

        await session.save();

        res.status(200).json({
            token,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

