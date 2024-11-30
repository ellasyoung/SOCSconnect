const express = require('express');
const Users = require('../models/Users');
const SingleAppointment = require('../models/Appointments'); 
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.post('/book-slot-single', async (req, res) => {
    try {
        const { meetingId, date, requesterEmail } = req.body;

        if (!meetingId || !date || !requesterEmail) {
            return res.status(400).json({ message: 'Meeting ID, date, and requester email are required.' });
        }

        const meeting = await SingleAppointment.findById(meetingId);
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found.' });
        }

        const meetingDate = new Date(meeting.date).toDateString();
        const requestedDate = new Date(date).toDateString();
        if (meetingDate !== requestedDate) {
            return res.status(400).json({ message: 'Invalid date for this meeting.' });
        }

        const currentBookings = meeting.bookings.length;
        if (currentBookings >= meeting.maxNumParticipants) {
            return res.status(400).json({ message: 'No spots left for this meeting.' });
        }

        const newBooking = {
            requesterEmail,
            bookingTime: new Date(),
        };
        meeting.bookings.push(newBooking);

        await meeting.save();

        res.status(200).json({
            message: 'Booking successful!',
            booking: newBooking,
            spotsLeft: meeting.maxNumParticipants - meeting.bookings.length,
        });
    } catch (error) {
        console.error('Error booking slot:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;


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