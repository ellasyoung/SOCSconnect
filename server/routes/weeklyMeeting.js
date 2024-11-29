const express = require('express');
const WeeklyOfficeHours = require('../models/WeeklyRecurringOH');
const Users = require('../models/Users');
const router = express.Router();

router.post('/', async (req, res) => {
    const { hostEmail, title, dayOfWeek, startTime, endTime, startDate, endDate, maxNumParticipants } = req.body;

    try {
        const host = await Users.findOne({ email: hostEmail });
        if (!host) {
            return res.status(404).json({ message: 'Host not found with the provided email.' });
        }

        const recurringSlot = [];
        let currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
            const currentDay = currentDate.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
            if (currentDay === dayOfWeek.toLowerCase()) {
                recurringSlot.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (recurringSlot.length === 0) {
            return res.status(400).json({ message: 'No valid recurring slots found for the given dates and day of the week.' });
        }

        const newMeeting = new WeeklyOfficeHours({
            hostId: host._id,
            title,
            schedule: {
                dayOfWeek,
                recurringSlot,
                startTime,
                endTime,
                startDate,
                endDate,
            },
            maxNumParticipants,
        });

        const savedMeeting = await newMeeting.save();
        res.status(201).json(savedMeeting);
    } catch (error) {
        console.error('Error creating weekly office hours:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
