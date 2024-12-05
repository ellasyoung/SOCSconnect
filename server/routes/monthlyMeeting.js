const express = require('express');
const router = express.Router();
const MonthlyOfficeHours = require('../models/MonthlyRecurringOH');
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/Users');

router.post('/book-slot-monthly', async (req, res) => {
  try {
    const { meetingId, date, requesterEmail } = req.body;

    if (!meetingId || !date || !requesterEmail) {
      return res.status(400).json({ message: 'Meeting ID, date, and requester email are required.' });
    }

    const meeting = await MonthlyOfficeHours.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found.' });
    }

    const selectedDate = new Date(date);

    const alreadyBooked = meeting.bookSlot.some(
      (slot) => 
        new Date(slot.date).toDateString() === selectedDate.toDateString() &&
        slot.requesterEmail === requesterEmail
    );

    if (alreadyBooked) {
      return res.status(400).json({ message: 'You have already signed up for this meeting on the selected date.' });
    }

    const bookingsForDate = meeting.bookSlot.filter(
      (slot) => new Date(slot.date).toDateString() === selectedDate.toDateString()
    );

    if (bookingsForDate.length >= meeting.maxNumParticipants) {
      return res.status(400).json({ message: 'No spots left for the selected date.' });
    }

    const newBooking = {
      date: selectedDate,
      requesterEmail,
      bookingCreated: new Date(),
    };
    meeting.bookSlot.push(newBooking);

    await meeting.save();

    res.status(200).json({
      message: 'Booking successful!',
      booking: newBooking,
      spotsLeft: meeting.maxNumParticipants - bookingsForDate.length - 1,
    });
  } catch (error) {
    console.error('Error booking slot:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


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
