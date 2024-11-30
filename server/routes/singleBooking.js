const express = require('express');
const Users = require('../models/Users');
const SingleAppointment = require('../models/Appointments'); 
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.post('/new-single-meeting', async (req, res) => {
    const { hostEmail, title, date, startTime, endTime, maxNumParticipants } = req.body;

    try {
        const host = await Users.findOne({ email: hostEmail });
        if (!host) {
            return res.status(404).json({ message: 'Host not found with the provided email.' });
        }

        const uniqueUrl = `meeting/${uuidv4()}`;

        const newMeeting = new SingleAppointment({
            hostId: host._id,
            title,
            date,
            startTime,
            endTime,
            url: uniqueUrl,
            maxNumParticipants,
        });

        const savedMeeting = await newMeeting.save();
        res.status(201).json(savedMeeting);
    } catch (error) {
        console.error('Error creating single booking:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;