const express = require('express');
const Users = require('../models/Users'); 
const AlternateRequests = require('../models/AlternateRequests'); 
const MonthlyRecurring = require('../models/MonthlyRecurringOH');
const WeeklyRecurring = require('../models/WeeklyRecurringOH');
const Appointments = require('../models/Appointments');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

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
        const currDate = new Date();

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

        for (const appointment of appointments) {

            const meetingDate = new Date(appointment.date);
            const hostEmail = await getHostEmail(appointment.hostId);
            const isMine = hostEmail === requesterEmail;
            const hostName = await getUserNameByEmail(hostEmail);

            if(isMine){
                for (const booking of appointment.bookings) {

                    const reqName = await getUserNameByEmail(booking.requesterEmail);

                    const meetingDetails = {
                        _id: appointment._id,
                        title: appointment.title,
                        date: meetingDate,
                        startTime: appointment.startTime,
                        endTime: appointment.endTime,
                        hostId: appointment.hostId,
                        hostEmail: hostEmail,
                        hostName: hostName,
                        requesterEmail: booking.requesterEmail,
                        requesterName: reqName, 
                        mine: isMine,
                    };
    
                    if (meetingDate >= currDate) {
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
                    date: meetingDate,
                    startTime: appointment.startTime,
                    endTime: appointment.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    hostName: hostName,
                    requesterEmail: requesterEmail,
                    requesterName: reqName, 
                    mine: isMine,
                };

                if (meetingDate >= currDate) {
                    upcomingMeetings.push(meetingDetails);
                } else {
                    pastMeetings.push(meetingDetails);
                }
            }

        }

        for (const appointment of monthlyApps) {
            for (const booking of appointment.bookSlot) {
                const meetingDate = new Date(booking.date);
                const hostEmail = await getHostEmail(appointment.hostId);

                const isMine = hostEmail === requesterEmail;

                const hostName = await getUserNameByEmail(hostEmail);
                const reqName = await getUserNameByEmail(booking.requesterEmail);

                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: meetingDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    hostName: hostName,
                    requesterEmail: booking.requesterEmail,
                    requesterName: reqName,
                    mine: isMine,
                };

                if (meetingDate >= currDate) {
                    upcomingMeetings.push(meetingDetails);
                } else {
                    pastMeetings.push(meetingDetails);
                }
            }
        }

        for (const appointment of weeklyApps) {
            for (const booking of appointment.bookSlot) {
                const meetingDate = new Date(booking.date);
                const hostEmail = await getHostEmail(appointment.hostId);

                const isMine = hostEmail === requesterEmail;

                const hostName = await getUserNameByEmail(hostEmail);
                const reqName = await getUserNameByEmail(booking.requesterEmail);

                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: meetingDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    hostName: hostName,
                    requesterEmail: booking.requesterEmail,
                    requesterName: reqName,
                    mine: isMine,
                };

                if (meetingDate >= currDate) {
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

        await appointment.save();

        res.status(200).json({ message: 'Request accepted and appointment created', appointment });
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
        await request.save();

        res.status(200).json({ message: 'Request status updated successfully' });
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;

