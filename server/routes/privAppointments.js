const express = require('express');
const Users = require('../models/Users'); 
const AlternateRequests = require('../models/AlternateRequests'); 
const MonthlyRecurring = require('../models/MonthlyRecurringOH');
const WeeklyRecurring = require('../models/WeeklyRecurringOH');
const Appointments = require('../models/Appointments');
const router = express.Router();

router.get('/incoming-requests', async (req, res) => {
    const {requesterEmail} = req.query; 

    try{
        const requester = await Users.findOne({ email: requesterEmail });

        if(!requester){
            return res.status(404).json({error: "Requester not found."});
        }
        
        const incomingRequests = await AlternateRequests.find({
            hostId: requester._id,
            requestStatus: 'Pending'

        });
        res.status(200).json(incomingRequests); //returns to front end
    }catch (error){
        console.error("Error fetching incoming requests", error);
        res.status(500).json({error: "Failed to fetch incoming requests"});
    }
});

module.exports = router;

router.get('/meetings', async (req, res) => {
    const {requesterEmail} = req.query; 

    try{
        const currDate = new Date();
        
        if (!requesterEmail){
            return res.status(400).json({ error: "Requester email not provided" })
        }

        // fetch all single appointments for the user
        const appointments = await Appointments.find({
            "bookings.requesterEmail": requesterEmail,
        });

        //fetch all monthly appts for the user 
        const monthlyApps = await MonthlyRecurring.find({
            "bookSlot.requesterEmail": requesterEmail,
        })

        //fetch all weekly appts for the user 
        const weeklyApps = await WeeklyRecurring.find({
            "bookSlot.requesterEmail": requesterEmail,
        })


        // Separate the appointments into upcoming and past based on the date
        const upcomingMeetings = [];
        const pastMeetings = [];

        //process single appts collection 
        appointments.forEach((appointment) => {
            const meetingDate = new Date(appointment.date);

            if (meetingDate >= currDate) {
                upcomingMeetings.push(appointment); // Meeting is upcoming
            } else {
                pastMeetings.push(appointment); // Meeting is in the past
            }
        });

        
        //process monthly OH collection
        monthlyApps.forEach((appointment) =>{
            appointment.bookSlot.forEach((booking) => {
                const meetingDate = new Date(booking.date);
                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: meetingDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    requesterEmail: booking.requesterEmail,
                };

                if (meetingDate >= currDate){
                    upcomingMeetings.push(meetingDetails);
                } else {
                    pastMeetings.push(meetingDetails);
                }

            });
        });
        
        //process weekly collection 
        weeklyApps.forEach((appointment) =>{
            appointment.bookSlot.forEach((booking) => {
                const meetingDate = new Date(booking.date);
                const meetingDetails = {
                    _id: appointment._id,
                    title: appointment.title,
                    date: meetingDate,
                    startTime: appointment.schedule.startTime,
                    endTime: appointment.schedule.endTime,
                    hostId: appointment.hostId,
                    requesterEmail: booking.requesterEmail,
                };

                if (meetingDate >= currDate){
                    upcomingMeetings.push(meetingDetails);
                } else {
                    pastMeetings.push(meetingDetails);
                }
                
            });
        });
        

        // sort meeting lists by date
        upcomingMeetings.sort((a, b) => new Date(a.date) - new Date(b.date));
        pastMeetings.sort((a, b) => new Date(b.date) - new Date(a.date));

        // send both lists to front end 
        res.status(200).json({ upcomingMeetings, pastMeetings });

    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
