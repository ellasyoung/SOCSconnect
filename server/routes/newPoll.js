const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/Users');
const Polls = require('../models/Polls');

router.post('/polls/:pollId/vote', async (req, res) => {
    const { pollId } = req.params;
    const { votes } = req.body; 

    try {
        const poll = await Polls.findById(pollId);

        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        votes.forEach(({ date, startTime, endTime, requesterEmail }) => {
            const pollDate = poll.pollOption.find(option => 
                option.date.toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
            );

            if (pollDate) {
                const timeOption = pollDate.timeOptions.find(option => 
                    option.startTime === startTime && option.endTime === endTime
                );

                if (timeOption) {
                    const voteExists = timeOption.votes.some(vote => vote.requesterEmail === requesterEmail);
                    if (!voteExists) {
                        timeOption.votes.push({ requesterEmail });
                    }
                }
            }
        });

        await poll.save();

        res.status(200).json({ message: 'Votes submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving votes' });
    }
});



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