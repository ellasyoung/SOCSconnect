const express = require('express');
const Users = require('../models/Users'); 
const AlternateRequests = require('../models/AlternateRequests'); 
const router = express.Router();

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

        res.status(201).json(newRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
