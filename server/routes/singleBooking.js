const express = require('express');
const Users = require('../models/Users');
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

router.post('/book-slot-single', async (req, res) => {
    try {
        const { meetingId, date, requesterEmail } = req.body;

        const myDate = date.split('T')[0];


        if (!meetingId || !date || !requesterEmail) {
            return res.status(400).json({ message: 'Meeting ID, date, and requester email are required.' });
        }

        const meeting = await SingleAppointment.findById(meetingId);
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found.' });
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

        const user = await Users.findById(meeting.hostId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' })};
        

        const mailOptions = {
            from: 'socsconnect@gmail.com', 
            to: requesterEmail,                    
            subject: 'Booking Confirmation',
            html: `
                <h3>Meeting confirmed!</h3>
                <p>You have successfully booked a meeting slot on ${myDate} from ${meeting.startTime} until ${meeting.endTime}
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

        const mailOptions = {
            from: 'socsconnect@gmail.com', 
            to: hostEmail,                    
            subject: 'Single Meeting Confirmation',
            html: `
                <h3>Thank you for booking with us!</h3>
                <p>You have created a meeting for "${title}" on ${date}, from ${startTime} until ${endTime}</p>
                <p>To get started, you can visit our website at:</p>
                <p><a href="${uniqueUrl}">Copy this link to your unique booking!</a></p>
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
        console.error('Error creating single booking:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;