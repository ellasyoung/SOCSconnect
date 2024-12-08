const express = require('express');
const Users = require('../models/Users'); 
const AlternateRequests = require('../models/AlternateRequests'); 
const MonthlyRecurring = require('../models/MonthlyRecurringOH');
const WeeklyRecurring = require('../models/WeeklyRecurringOH');
const Appointments = require('../models/Appointments');
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
            requestStatus: 'Pending',
        });

        const myRequests = await AlternateRequests.find({
            requesterId: requester._id,
            requestStatus: 'Pending',
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

        // Fetch all appointments for the user
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

        // Helper function to fetch the host's email
        const getHostEmail = async (hostId) => {
            const host = await Users.findById(hostId).select("email");
            return host?.email || null;
        };

        // Process single appointments
        for (const appointment of appointments) {
            const meetingDate = new Date(appointment.date);
            const hostEmail = await getHostEmail(appointment.hostId);

            const isMine = hostEmail === requesterEmail;

            const meetingDetails = {
                ...appointment.toObject(),
                mine: isMine, // Add the "mine" flag
            };

            if (meetingDate >= currDate) {
                upcomingMeetings.push(meetingDetails);
            } else {
                pastMeetings.push(meetingDetails);
            }
        }

        // Process monthly recurring appointments
        for (const appointment of monthlyApps) {
            for (const booking of appointment.bookSlot) {
                const meetingDate = new Date(booking.date);
                const hostEmail = await getHostEmail(appointment.hostId);

                const isMine = hostEmail === requesterEmail;

                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: meetingDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    requesterEmail: booking.requesterEmail,
                    mine: isMine, // Add the "mine" flag
                };

                if (meetingDate >= currDate) {
                    upcomingMeetings.push(meetingDetails);
                } else {
                    pastMeetings.push(meetingDetails);
                }
            }
        }

        // Process weekly recurring appointments
        for (const appointment of weeklyApps) {
            for (const booking of appointment.bookSlot) {
                const meetingDate = new Date(booking.date);

                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: meetingDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    requesterEmail: booking.requesterEmail,
                    mine: isMine,
                };

                if (meetingDate >= currDate) {
                    upcomingMeetings.push(meetingDetails);
                } else {
                    pastMeetings.push(meetingDetails);
                }
            }
        }

        // Sort meeting lists by date
        upcomingMeetings.sort((a, b) => new Date(a.date) - new Date(b.date));
        pastMeetings.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Send the response
        res.status(200).json({ upcomingMeetings, pastMeetings });
    } catch (error) {
        console.error("Error fetching meetings:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});


module.exports = router;
