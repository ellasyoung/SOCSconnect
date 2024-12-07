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

    try{
        const currDate = new Date();

        const userEmail = req.query.requesterEmail;
        console.log(userEmail);

        if(!userEmail){
            return res.status(400).json({message: "User email not provided"}); 
        }

        //find all dates in occuring monthly 
         const upcomingMonthly = await MonthlyRecurring.find({
            "bookSlot.requesterEmail": userEmail,
            "bookSlot.date": { $gte: currDate }
        });

         const pastMonthly = await MonthlyReccuring.find({ 
            "bookSlot.requesterEmail": userEmail,
            "bookSlot.date": { $gte: currDate }
         });

        // find all dates in occuring weekly 
         const upcomingWeekly = await WeeklyRecurring.find({ 
            "bookSlot.requesterEmail": userEmail,
            "bookSlot.date": { $gte: currDate }
         }); 

         const pastWeekly = await WeeklyRecurring.find({ 
            "bookSlot.requesterEmail": userEmail,
            "bookSlot.date": { $gte: currDate } }); 

         // find all single mtgs
        const upcomingAppointments = await Appointments.find({ 
            "bookings.requesterEmail": userEmail,
            date: { $gte: currentDate } });

        const pastAppointments = await Appointments.find({ 
            "bookings.requesterEmail": userEmail,
            date: { $lt: currentDate } });

        // combine into upcoming and past meetings lists
        const upcomingMeetings = [
            ...upcomingMonthly,
            ...upcomingWeekly,
            ...upcomingAppointments,
        ];

        const pastMeetings = [
            ...pastMonthly,
            ...pastWeekly,
            ...pastAppointments,
        ];

        // sort lists by date
        upcomingMeetings.sort((a, b) => new Date(a.date) - new Date(b.date));
        pastMeetings.sort((a, b) => new Date(b.date) - new Date(a.date));


        res.status(200).json({ upcomingMeetings, pastMeetings }); //returns to front end 
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
