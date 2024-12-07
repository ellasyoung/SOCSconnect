const express = require('express');
const router = express.Router();
const MonthlyOfficeHours = require('../models/MonthlyRecurringOH');
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/Users');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
      user: 'socsconnect@gmail.com', 
      pass: 'tprd zosy lktd ksvi',  
  },
});

router.post('/book-slot-monthly', async (req, res) => {
  try {
    const { meetingId, date, requesterEmail } = req.body;
    const myDate = date.split('T')[0];

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

    const user = await Users.findById(meeting.hostId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' })};
    
    let bookingBody = `
    <h3>Meeting confirmed!</h3>
        <p>You have successfully booked a meeting slot on ${myDate} from ${meeting.schedule.startTime} until ${meeting.schedule.endTime}
        with ${user.firstName} ${user.lastName}. 
    `;

    if(meeting.location) {
      bookingBody += `<p>The location of your meeting is ${meeting.location}.</p>`;
    }

    if(meeting.notes) {
      bookingBody += `<p>The creator of this meeting has noted "${meeting.notes}".</p>`
    }

    bookingBody += `<p>If you have any questions or need support, feel free to contact us.</p>`;
      
    const mailOptions = {
      from: 'socsconnect@gmail.com', 
      to: requesterEmail,                    
      subject: 'Booking Confirmation',
      html: bookingBody
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


router.post('/monthly-meeting', async (req, res) => {
    try {
        const { 
            title, hostEmail, schedule, bookSlot, maxNumParticipants, location, notes 
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
            maxNumParticipants,
            location,
            notes
        });

        const savedMeeting = await newMeeting.save();
        res.status(201).json(savedMeeting);

        let emailBody = `
        <h3>Thank you for booking with us!</h3>
        `;

        if(schedule.date) {
          emailBody += `<p>You have created a monthly recurring meeting for "${title}" 
          on the ${schedule.date} of the month beginning from ${schedule.startDate} and ending on ${schedule.endDate}
          starting at ${schedule.startTime} until ${schedule.endTime}.</p>`;
        }

        else if(schedule.day) {
          emailBody += `<p>You have created a monthly recurring meeting for "${title}" 
          on each ${schedule.day} beginning from ${schedule.startDate} and ending on ${schedule.endDate}
          starting at ${schedule.startTime} until ${schedule.endTime}.</p>`;
        }

        if(location) {
          emailBody += `<p>The location of your meeting is ${location}.</p>`;
        }

        if(notes) {
          emailBody += `<p>You have included notes that say "${notes}".</p>`;
        }

        emailBody += `
        <p><a href="http://localhost:3000/${uniqueUrl}">Copy this link to your unique booking!</a></p>
        <p>If you have any questions or need support, feel free to contact us.</p>
        `

        const mailOptions = {
          from: 'socsconnect@gmail.com', 
          to: hostEmail,                    
          subject: 'Monthly Recurring Meeting Confirmation',
          html: emailBody
        };


        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log('Error sending email:', error);
              return res.status(500).json({ message: 'User registered, but failed to send confirmation email.' });
          }
          console.log('Confirmation email sent: ' + info.response);
      });
    } catch (error) {
        console.error('Error creating monthly meeting:', error.message);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
