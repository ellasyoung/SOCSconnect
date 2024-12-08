const express = require('express');
const Users = require('../models/Users'); 
const AlternateRequests = require('../models/AlternateRequests'); 
const router = express.Router();const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'socsconnect@gmail.com', 
        pass: 'tprd zosy lktd ksvi',  
    },
});


router.post('/', async (req, res) => {
    const { requesterEmail, hostEmail, alternateTimes, requestStatus } = req.body;

    try {
        const requester = await Users.findOne({ email: requesterEmail });
        const host = await Users.findOne({ email: hostEmail });

        if (!requester || !host) {
            return res.status(404).json({ message: "User not found" });
        }

        const newRequest = new AlternateRequests({
            requesterId: requester._id,
            hostId: host._id,
            alternateTimes,
            requestStatus: requestStatus || 'Pending',
        });

        await newRequest.save();

        let emailBody = `
        <h3>Thank you for using our services!</h3>
        <p>You have created a request to meet with ${hostEmail}
        `;

        if(alternateTimes[0].title) {
            emailBody += ` for ${alternateTimes[0].title}`;
        }

        emailBody += `
         on ${alternateTimes[0].proposedDate} from ${alternateTimes[0].proposedStartTime} until ${alternateTimes[0].proposedEndTime}.
            </p>.
            </P>You request is currently pending. You can view that status of your request under
             the "Requests" tab at <a href="http://localhost:3000/my-appointments">My Appointments</a>.</p>
            <p>If you have any questions or need support, feel free to contact us.</p>
        `

        res.status(201).json(newRequest);
        const mailOptions = {
            from: 'socsconnect@gmail.com',
            to: requesterEmail,
            subject: 'Request Meeting Time Form',
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
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
