const express = require('express');
const Users = require('../models/Users'); 
const AlternateRequests = require('../models/AlternateRequests'); 
const MonthlyRecurring = require('../models/MonthlyRecurringOH');
const WeeklyRecurring = require('../models/WeeklyRecurringOH');
const Appointments = require('../models/Appointments');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const nodemailer = require('nodemailer');
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'socsconnect@gmail.com', 
        pass: 'tprd zosy lktd ksvi',  
    },
});

router.get('/incoming-requests', async (req, res) => {
    const { requesterEmail } = req.query;

    try {
        const requester = await Users.findOne({ email: requesterEmail });

        if (!requester) {
            return res.status(404).json({ error: "Requester not found." });
        }

        const hostedRequests = await AlternateRequests.find({
            hostId: requester._id,
        });

        const myRequests = await AlternateRequests.find({
            requesterId: requester._id,
        });

        const myRequestsWithFlag = myRequests.map(request => ({
            ...request.toObject(),
            mine: true, 
        }));

        const incomingRequests = [...hostedRequests, ...myRequestsWithFlag];

        incomingRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json(incomingRequests);
    } catch (error) {
        console.error("Error fetching incoming requests", error);
        res.status(500).json({ error: "Failed to fetch incoming requests" });
    }
});


router.get('/meetings', async (req, res) => {
    const { requesterEmail } = req.query;

    try {

        function getCurrentESTTime() {
            const currDate = new Date();  
            const estOffset = -5 * 60 * 60 * 1000; //manually adjust to est time 
            const estTime = new Date(currDate.getTime() + estOffset);
        
            return estTime;

        }

        if (!requesterEmail) {
            return res.status(400).json({ error: "Requester email not provided" });
        }

        const getUserNameByEmail = async (email) => {
            const user = await Users.findOne({ email }).select("firstName lastName");
            return user ? `${user.firstName} ${user.lastName}` : email;
        };

        const appointments = await Appointments.find({
            $or: [
                { "bookings.requesterEmail": requesterEmail },
                { hostId: await Users.findOne({ email: requesterEmail }).select('_id') }
            ],
        });

        const monthlyApps = await MonthlyRecurring.find({
            $or: [
                { "bookSlot.requesterEmail": requesterEmail },
                { hostId: await Users.findOne({ email: requesterEmail }).select('_id') }
            ],
        });

        const weeklyApps = await WeeklyRecurring.find({
            $or: [
                { "bookSlot.requesterEmail": requesterEmail },
                { hostId: await Users.findOne({ email: requesterEmail }).select('_id') }
            ],
        });

        const upcomingMeetings = [];
        const pastMeetings = [];

        const getHostEmail = async (hostId) => {
            const host = await Users.findById(hostId).select("email");
            return host?.email || null;
        };

        function combineDateTime(date, timeString) {
            const is24HourFormat = timeString.includes(":");
            let adjustedHours, minutes;

            if (is24HourFormat) {
                const [hours, minutesPart] = timeString.split(":");
                minutes = parseInt(minutesPart, 10);
                adjustedHours = parseInt(hours, 10);
            } else {
                const [hours, minutesPart] = timeString.split(":");
                minutes = parseInt(minutesPart.match(/\d+/)[0], 10);
                const isPM = timeString.toLowerCase().includes("pm");
                adjustedHours = parseInt(hours, 10);

                if (isPM && adjustedHours < 12) {
                    adjustedHours += 12;
                } else if (!isPM && adjustedHours === 12) {
                    adjustedHours = 0;
                }
            }

            date.setUTCHours(adjustedHours, minutes, 0, 0);

            return date;
        }


        for (const appointment of appointments) {
    
            let meetingDate = new Date(appointment.date);
            meetingDate = combineDateTime(meetingDate, appointment.startTime);

            let currentEST = getCurrentESTTime();

            const hostEmail = await getHostEmail(appointment.hostId);
            const mDate = new Date(appointment.date);
            const isMine = hostEmail === requesterEmail;
            const hostName = await getUserNameByEmail(hostEmail);

            if(isMine){
                for (const booking of appointment.bookings) {

                    const reqName = await getUserNameByEmail(booking.requesterEmail);

                    const meetingDetails = {
                        _id: appointment._id,
                        title: appointment.title,
                        date: mDate,
                        startTime: appointment.startTime,
                        endTime: appointment.endTime,
                        hostId: appointment.hostId,
                        hostEmail: hostEmail,
                        hostName: hostName,
                        requesterEmail: booking.requesterEmail,
                        requesterName: reqName, 
                        mine: isMine,
                    };
    
                    if (meetingDate >= currentEST) {
                        upcomingMeetings.push(meetingDetails);
                    } else {
                        pastMeetings.push(meetingDetails);
                    }
                }
            }else{
                const reqName = getUserNameByEmail(requesterEmail);
                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: mDate,
                    startTime: appointment.startTime,
                    endTime: appointment.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    hostName: hostName,
                    requesterEmail: requesterEmail,
                    requesterName: reqName, 
                    mine: isMine,
                };

                if (meetingDate >= currentEST) {
                    upcomingMeetings.push(meetingDetails);
                } else {
                    pastMeetings.push(meetingDetails);
                }
            }

        }

        for (const appointment of monthlyApps) {
            for (const booking of appointment.bookSlot) {
              
                let meetingDate = new Date(booking.date);
                meetingDate = combineDateTime(meetingDate, appointment.schedule.startTime);

                let currentEST = getCurrentESTTime();
              
                const mDate = new Date(booking.date);
                const hostEmail = await getHostEmail(appointment.hostId);

                const isMine = hostEmail === requesterEmail;

                const hostName = await getUserNameByEmail(hostEmail);
                const reqName = await getUserNameByEmail(booking.requesterEmail);

                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: mDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    hostName: hostName,
                    requesterEmail: booking.requesterEmail,
                    requesterName: reqName,
                    mine: isMine,
                };

                if (meetingDate >= currentEST) {
                    upcomingMeetings.push(meetingDetails);
                } else {
                    pastMeetings.push(meetingDetails);
                }
            }
        }

        for (const appointment of weeklyApps) {
            for (const booking of appointment.bookSlot) {
                let meetingDate = new Date(booking.date);
                meetingDate = combineDateTime(meetingDate, appointment.schedule.startTime);

                let currentEST = getCurrentESTTime();
              
                const mDate = new Date(booking.date);
                const hostEmail = await getHostEmail(appointment.hostId);

                const isMine = hostEmail === requesterEmail;

                const hostName = await getUserNameByEmail(hostEmail);
                const reqName = await getUserNameByEmail(booking.requesterEmail);

                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: mDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    hostName: hostName,
                    requesterEmail: booking.requesterEmail,
                    requesterName: reqName,
                    mine: isMine,
                };

                if (meetingDate >= currentEST) {
                    upcomingMeetings.push(meetingDetails);
                    
                } else {
                    pastMeetings.push(meetingDetails);
                }
            }
        }

        upcomingMeetings.sort((a, b) => new Date(a.date) - new Date(b.date));
        pastMeetings.sort((a, b) => new Date(b.date) - new Date(a.date));

        res.status(200).json({ upcomingMeetings, pastMeetings });
    } catch (error) {
        console.error("Error fetching meetings:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});


router.post('/accept-request', async (req, res) => {
    const { requestId, requesterEmail, title } = req.body;

    try {
        const request = await AlternateRequests.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.requestStatus = 'Approved';
        await request.save();

        const { hostId, alternateTimes } = request;
        const { proposedDate, proposedStartTime, proposedEndTime, title } = alternateTimes[0];

        const uniqueUrl = `meeting/${uuidv4()}`;

        const appointment = new Appointments({
            hostId,
            title,
            date: proposedDate,
            startTime: proposedStartTime,
            endTime: proposedEndTime,
            url: uniqueUrl,
            maxNumParticipants: 1,
            bookings: [
                {
                    requesterEmail,
                },
            ],
        });

        const user = await Users.findById(hostId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' })};
        
        const requester = await Users.findById(request.requesterId);
                if(!requester) {
                    return res.status(404).json({message: 'Requester not found'});
        }

        await appointment.save();

        res.status(200).json({ message: 'Request accepted and appointment created', appointment });

        let bookingBody = `
        <h3>Request approved!</h3>
        <p>Your meeting request with ${user.firstName} ${user.lastName} on ${proposedDate.toISOString().split('T')[0]} 
        from ${proposedStartTime} until ${proposedEndTime} has been approved  
        `;

        let approvalBody = `
            <h3>New Meeting Alert</h3>
            <p>You recently approved a meeting request with ${requester.firstName} ${requester.lastName} on ${proposedDate.toISOString().split('T')[0]}
             from ${proposedStartTime} until ${proposedEndTime}
        `;

        if (title) {
            bookingBody += `
             for "${title}"`;
            
            approvalBody += `
            for "${title}"`;
        }


        bookingBody += `.</p>
        <p>You can view the approved meeting under the "Upcoming" tab at <a href="${frontendUrl}/my-appointments">My Appointments</a>.</p>
        <p>If you have any questions or need support, feel free to contact us.</p>`;

        approvalBody += `.</p>
        <p>You can view the approved meeting under the "Upcoming" tab at <a href="${frontendUrl}/my-appointments">My Appointments</a>.</p>
        <p>If you have any questions or need support, feel free to contact us.</p>`;
        const mailOptions = {
            from: 'socsconnect@gmail.com', 
            to: requesterEmail,                    
            subject: 'Meeting Request Approved',
            html: bookingBody
        }

        const mailOptions2 = {
            from: 'socsconnect@gmail.com',
            to: user.email,
            subject: 'You Approved a Request',
            html: approvalBody
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: 'Meeting booked, but failed to send confirmation email.' });
            }
            console.log('Confirmation email sent: ' + info.response);
        });

        transporter.sendMail(mailOptions2, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: 'Meeting booked, but failed to send confirmation email.' });
            }
            console.log('Confirmation email sent: ' + info.response);
        });
    } catch (error) {
        console.error('Error handling request acceptance:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/deny-request/:requestId', async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;

    try {
        const request = await AlternateRequests.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        request.requestStatus = status; 
        const hostId = request.hostId;
        await request.save();

        res.status(200).json({ message: 'Request status updated successfully' });

        const user = await Users.findById(hostId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })};

        const requester = await Users.findById(request.requesterId);
        if(!requester) {
            return res.status(404).json({message: 'Requester not found'});
        }

        let bookingBody = `
        <h3>Request denied.</h3>
        <p>Your meeting request with ${user.firstName} ${user.lastName} on ${(request.alternateTimes[0].proposedDate.toISOString().split('T')[0])} 
        from ${request.alternateTimes[0].proposedStartTime} until ${request.alternateTimes[0].proposedEndTime} has been denied  
        `;

        if (request.alternateTimes[0].title) {
            bookingBody += `
             for "${request.alternateTimes[0].title}"`;
        }


        bookingBody += `.</p><p>If you have any questions or need support, feel free to contact us.</p>`;
        const mailOptions = {
            from: 'socsconnect@gmail.com', 
            to: requester.email,                    
            subject: 'Meeting Request Denied',
            html: bookingBody
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: 'Meeting denied, but failed to send confirmation email.' });
            }
            console.log('Confirmation email sent: ' + info.response);
        });
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/cancel-booking', async (req, res) => {
    const { meetingId, requesterEmail } = req.body;

    try {
        const models = [Appointments, WeeklyRecurring, MonthlyRecurring];
        let foundMeeting = null;
        let meetingType = '';

        for (const model of models) {
            foundMeeting = await model.findById(meetingId);
            if (foundMeeting) {
                meetingType = model.modelName; 
                break;
            }
        }

        if (!foundMeeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        const initialLength = foundMeeting.bookings?.length || foundMeeting.bookSlot?.length;
        if (foundMeeting.bookings) {
            foundMeeting.bookings = foundMeeting.bookings.filter(
                (booking) => booking.requesterEmail !== requesterEmail
            );
        } else if (foundMeeting.bookSlot) {
            foundMeeting.bookSlot = foundMeeting.bookSlot.filter(
                (slot) => slot.requesterEmail !== requesterEmail
            );
        }

        const updatedLength = foundMeeting.bookings?.length || foundMeeting.bookSlot?.length;
        if (initialLength === updatedLength) {
            return res.status(404).json({ message: 'Booking not found for the given requesterEmail' });
        }

        await foundMeeting.save();

        res.status(200).json({
            message: 'Booking cancelled successfully',
            meetingType,
            meeting: foundMeeting,
        });

        const user = await Users.findById(foundMeeting.hostId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' })};
        
       

        const mailOptions = {
            from: 'socsconnect@gmail.com',
            to: requesterEmail,
            subject: 'Cancellation Confirmation',
            html: 
            `<h3>Meeting cancelled!</h3>
            <p>You have cancelled a meeting with ${user.firstName} ${user.lastName}.</p>
            <p>If you have any questions or need support, feel free to contact us.</p>
            `
        }

        const mailOptions2 = {
            from: 'socsconnect@gmail.com',
            to: user.email,
            subject: 'Cancellation Confirmation',
            html: 
            `<h3>Meeting cancelled!</h3>
            <p>Your meeting with ${requesterEmail} has been cancelled.</p>
            <p>If you have any questions or need support, feel free to contact us.</p>
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: 'Meeting cancelled, but failed to send confirmation email.' });
            }
            console.log('Confirmation email sent: ' + info.response);
        });

        transporter.sendMail(mailOptions2, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: 'Meeting cancelled, but failed to send confirmation email.' });
            }
            console.log('Confirmation email sent: ' + info.response);
        });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});



module.exports = router;