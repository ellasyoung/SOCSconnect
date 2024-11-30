const express = require('express');
const router = express.Router();
const MonthlyOfficeHours = require('../models/MonthlyRecurringOH');
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/Users');

router.post('/monthly-meeting', async (req, res) => {
    try {
        const { 
            title, hostEmail, schedule, bookSlot, maxNumParticipants 
        } = req.body;

        const host = await Users.findOne({ email: hostEmail });
        if (!host) {
            return res.status(404).json({ message: 'Host not found with the provided email.' });
        }

        const uniqueUrl = `meeting/${uuidv4()}`;

        const newMeeting = new MonthlyOfficeHours({
            title,
            hostId: host,
            schedule,
            bookSlot,
            url: uniqueUrl,
            maxNumParticipants
        });

        const savedMeeting = await newMeeting.save();
        res.status(201).json(savedMeeting);
    } catch (error) {
        console.error('Error creating monthly meeting:', error.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
