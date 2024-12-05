const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/Users');
const Polls = require('../models/Polls');

router.post('/new-poll', async (req, res) => {
    const { title, pollOption, hostEmail } = req.body;

    try{
        const host = await Users.findOne({ email: hostEmail });
        if (!host) {
            return res.status(404).json({ message: 'Host not found with the provided email.' });
        }

        const uniqueUrl = `meeting/${uuidv4()}`;

        const newPoll = new Polls({
            hostId: host._id,
            title,
            pollOption,
            url: uniqueUrl,
        });

        const savedPoll = await newPoll.save();
        res.status(201).json(savedPoll);

    } catch (error) {
        console.error('Error creating weekly office hours:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }

});

module.exports = router;