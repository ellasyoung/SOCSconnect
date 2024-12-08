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

        const appointments = await Appointments.find({
            "bookings.requesterEmail": requesterEmail,
        });

        const monthlyApps = await MonthlyRecurring.find({
            "bookSlot.requesterEmail": requesterEmail,
        });

        const weeklyApps = await WeeklyRecurring.find({
            "bookSlot.requesterEmail": requesterEmail,
        });

        const upcomingMeetings = [];
        const pastMeetings = [];

        const getHostEmail = async (hostId) => {
            const host = await Users.findById(hostId).select("email");
            return host?.email || null;
        };

        for (const appointment of appointments) {
            const meetingDate = new Date(appointment.date);

            if (meetingDate >= currDate) {
                upcomingMeetings.push(appointment);
            } else {
                pastMeetings.push(appointment);
            }
        }

        for (const appointment of monthlyApps) {
            for (const booking of appointment.bookSlot) {
                const meetingDate = new Date(booking.date);
                const hostEmail = await getHostEmail(appointment.hostId);

                if (booking.requesterEmail != requesterEmail) continue;

                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: meetingDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    requesterEmail: booking.requesterEmail,
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

                if (booking.requesterEmail != requesterEmail) continue;

                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: meetingDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    hostEmail: hostEmail,
                    requesterEmail: booking.requesterEmail,
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

module.exports = router;
