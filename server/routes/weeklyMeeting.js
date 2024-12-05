const express = require('express');
const WeeklyOfficeHours = require('../models/WeeklyRecurringOH');
const Users = require('../models/Users');
const MonthlyOfficeHours = require('../models/MonthlyRecurringOH'); 
const SingleAppointment = require('../models/Appointments'); 
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.post('/book-slot-weekly', async (req, res) => {
    const { meetingId, date, requesterEmail } = req.body;
  
    try {
      const meeting = await WeeklyOfficeHours.findById(meetingId);
      if (!meeting) {
        return res.status(404).json({ message: 'Meeting not found' });
      }
  
      const existingBookings = meeting.bookSlot.filter(
        (slot) => new Date(slot.date).toDateString() === new Date(date).toDateString()
      );

      const alreadyBooked = existingBookings.some(
        (slot) => slot.requesterEmail === requesterEmail
      );

      if (alreadyBooked) {
        return res.status(400).json({ message: 'You have already signed up for this date.' });
      }

  
      if (existingBookings.length >= meeting.maxNumParticipants) {
        return res.status(400).json({ message: 'No spots left for this date.' });
      }
  
      meeting.bookSlot.push({ date, requesterEmail });
      await meeting.save();
  
      res.status(200).json({ message: 'Booking successful.' });
    } catch (error) {
      console.error('Error booking slot:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/meetings/:meetingId', async (req, res) => {
    const { meetingId } = req.params;

    try {
        let meeting = await WeeklyOfficeHours.findOne({ url: `meeting/${meetingId}` });
        if (meeting) {
            return res.status(200).json({ ...meeting.toObject(), type: 'weekly' });
        }

        meeting = await MonthlyOfficeHours.findOne({ url: `meeting/${meetingId}` });
        if (meeting) {
            return res.status(200).json({ ...meeting.toObject(), type: 'monthly' });
        }

        meeting = await SingleAppointment.findOne({ url: `meeting/${meetingId}` });
        if (meeting) {
            return res.status(200).json({ ...meeting.toObject(), type: 'single' });
        }

        return res.status(404).json({ message: 'Meeting not found' });
    } catch (error) {
        console.error('Error fetching meeting data:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

router.post('/new-weekly-meeting', async (req, res) => {
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

        const uniqueUrl = `meeting/${uuidv4()}`;

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
            url: uniqueUrl,
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
