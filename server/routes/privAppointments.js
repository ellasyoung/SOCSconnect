const express = require('express');
const router = express.Router();
const Appointments = require('../models/Appointments'); 


//route for appointment requests
router.get('/api/requests/:userId', async (req, res) =>{
    
    try {
        const { userEmail } = req.params;
        const requests = await Appointments.find({hostEmail: userEmail})
            .select("title date startTime endTime hostEmail requesterEmail createdAt") //fields to return
        
        console.log(requests);

        res.status(200).json(requests);     
    } catch (error){
            res.status(500).json({ message: "Error for fetching appointments requests", error });
    }
});

module.exports = router;

//route for upcoming appointments
router.get('/upcoming/:userId', async (req, res) =>{
    const { userId } = req.params; 
    try{
        const upcoming = await Appointments.find({
            hostId: userId,
            date: { $gte: new Date() } //get dates today or in future 
        }).select("title date startTime endTime hostId");
        res.status(200).json(upcoming);
    } catch (error){
        res.status(500).json({ message: "Error for fetching upcoming appointments", error });
    }
})

module.exports = router;

//route for past appointments 
router.get('/history/:userId', async (req, res) => {
    try{
        const history = await Appointments.find({
            hostId: userId, 
            date: { $lt : new Date() } // get past dates 
        }).select("title date startTime endTime hostId");
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Error for fetching past appointments", error });
    }

})

module.exports = router;
