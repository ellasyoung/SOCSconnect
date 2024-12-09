const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Users = require('../models/Users'); 
const router = express.Router();
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'socsconnect@gmail.com', 
        pass: 'tprd zosy lktd ksvi',  
    },
});

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

        const mailOptions = {
            from: 'socsconnect@gmail.com', 
            to: email,                    
            subject: 'Welcome to SOCSConnect!',
            html: `
                <h3>Dear ${firstName} ${lastName},</h3>
                <p>Thank you for registering on our platform.</p>
                <p>Your account has been successfully created!</p>
                <p>To get started, you can visit our website at:</p>
                <p><a href="${frontendUrl}">Click here to visit our site</a></p>
                <p>If you have any questions or need support, feel free to contact us.</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: 'User registered, but failed to send confirmation email.' });
            }
            console.log('Confirmation email sent: ' + info.response);
        });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error occurred during user registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
