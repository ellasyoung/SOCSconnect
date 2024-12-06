const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/Users');
const Polls = require('../models/Polls');
const mongoose = require('mongoose');

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

router.get('/polls/:pollId/vote-count', async (req, res) => {
    const { pollId } = req.params;
    const { date, startTime, endTime } = req.query;

    if (!pollId || !date || !startTime || !endTime) {
        return res.status(400).json({ message: 'Please provide pollId, date, startTime, and endTime' });
    }

    try {
        const queryDate = new Date(date);
        const startOfDay = new Date(Date.UTC(queryDate.getUTCFullYear(), queryDate.getUTCMonth(), queryDate.getUTCDate()));
        const endOfDay = new Date(startOfDay);
        endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);

        const poll = await Polls.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(pollId),
                    'pollOption.date': { $gte: startOfDay, $lt: endOfDay }
                }
            },
            { $unwind: '$pollOption' },
            { $unwind: '$pollOption.timeOptions' },
            {
                $match: {
                    'pollOption.timeOptions.startTime': startTime,
                    'pollOption.timeOptions.endTime': endTime
                }
            },
            {
                $project: {
                    _id: 0,
                    voteCount: { $size: '$pollOption.timeOptions.votes' }
                }
            }
        ]);

        if (!poll.length) {
            console.error('No matching poll or time slot found for:', { date, startTime, endTime });
            return res.status(404).json({ message: 'No poll or time slot found' });
        }

        res.json({ voteCount: poll[0].voteCount });
    } catch (error) {
        console.error('Error fetching vote count:', error);
        res.status(500).json({ message: 'An error occurred', error });
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


router.get('/polls/:pollId/user-votes', async (req, res) => {
    try {
        const { email } = req.query;
        const { pollId } = req.params;

        const poll = await Polls.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }

        const userVotes = [];
        poll.pollOption.forEach(option => {
            option.timeOptions.forEach(timeOption => {
                timeOption.votes.forEach(vote => {
                    if (vote.requesterEmail === email) {
                        userVotes.push({
                            date: option.date,
                            startTime: timeOption.startTime,
                            endTime: timeOption.endTime,
                        });
                    }
                });
            });
        });

        res.json({ votes: userVotes });
    } catch (error) {
        console.error("Error fetching user votes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;