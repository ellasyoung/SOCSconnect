const express = require('express');
const WeeklyOfficeHours = require('../models/WeeklyRecurringOH');
const Users = require('../models/Users');
const MonthlyOfficeHours = require('../models/MonthlyRecurringOH'); 
const SingleAppointment = require('../models/Appointments'); 
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'socsconnect@gmail.com', 
        pass: 'tprd zosy lktd ksvi',  
    },
});

router.post('/book-slot-weekly', async (req, res) => {
    const { meetingId, date, requesterEmail } = req.body;

    const myDate = date.split('T')[0];
  
    try {
        const meeting = await WeeklyOfficeHours.findById(meetingId);
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }
  
        const existingBookings = meeting.bookSlot.filter(
            (slot) => new Date(slot.date).toDateString() === new Date(date).toDateString()
        );
  
        if (existingBookings.length >= meeting.maxNumParticipants) {
            return res.status(400).json({ message: 'No spots left for this date.' });
        }
  
        meeting.bookSlot.push({ date, requesterEmail });
        await meeting.save();
  
        res.status(200).json({ message: 'Booking successful.' });

        const user = await Users.findById(meeting.hostId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' })};
      
        const mailOptions = {
            from: 'socsconnect@gmail.com', 
            to: requesterEmail,                    
            subject: 'Booking Confirmation',
            html: `
                <h3>Meeting confirmed!</h3>
                <p>You have successfully booked a meeting slot on ${myDate} from ${meeting.schedule.startTime} until ${meeting.schedule.endTime}
                with ${user.firstName} ${user.lastName}.
                <p>If you have any questions or need support, feel free to contact us.</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: 'Meeting booked, but failed to send confirmation email.' });
            }
            console.log('Confirmation email sent: ' + info.response);
        });

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

        const mailOptions = {
            from: 'socsconnect@gmail.com', 
            to: hostEmail,                    
            subject: 'Weekly Recurring Meeting Confirmation',
            html: `
                <h3>Thank you for booking with us!</h3>
                <p>You have created a weekly recurring meeting for "${title}" 
                on each ${dayOfWeek} beginning from ${startDate} and ending on ${endDate}
                starting at ${startTime} until ${endTime}.</p>
                <p><a href="http://localhost:3000/${uniqueUrl}">Copy this link to your unique booking!</a></p>
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

        
    } catch (error) {
        console.error('Error creating weekly office hours:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
