//Natalie Doehla
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Users = require('../models/Users');
const Polls = require('../models/Polls');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'socsconnect@gmail.com', 
        pass: 'tprd zosy lktd ksvi',  
    },
});

router.post('/polls/:pollId/vote', async (req, res) => {
    const { pollId } = req.params;
    const { votes } = req.body;

    try {
        const poll = await Polls.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        const userEmails = votes.map(vote => vote.requesterEmail);
        poll.pollOption.forEach(option => {
            option.timeOptions.forEach(time => {
                time.votes = time.votes.filter(
                    vote => !userEmails.includes(vote.requesterEmail)
                );
            });
        });

        votes.forEach(({ date, startTime, endTime, requesterEmail }) => {
            const pollDate = poll.pollOption.find(option =>
                option.date.toISOString().split('T')[0] ===
                new Date(date).toISOString().split('T')[0]
            );

            if (pollDate) {
                const timeOption = pollDate.timeOptions.find(option =>
                    option.startTime === startTime && option.endTime === endTime
                );

                if (timeOption) {
                    timeOption.votes.push({ requesterEmail });
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

        const poll = await Polls.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        let voteCount = 0;

        for (const pollOption of poll.pollOption) {
            const pollDate = new Date(pollOption.date);

            if (pollDate.toISOString().split('T')[0] === queryDate.toISOString().split('T')[0]) {
                for (const timeOption of pollOption.timeOptions) {
                    if (
                        timeOption.startTime === startTime &&
                        timeOption.endTime === endTime
                    ) {
                        voteCount = timeOption.votes.length;
                        break; 
                    }
                }
                break;
            }
        }

        res.json({ voteCount });
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

        const mailOptions = {
            from: 'socsconnect@gmail.com', 
            to: hostEmail,                    
            subject: 'Meeting Poll Confirmation',
            html: `
                <h3>Thank you for booking with us!</h3>
                <p>You have created a poll for "${title}". 
                <p><a href="${frontendUrl}/${uniqueUrl}">Copy this link to your unique meeting poll!</a></p>
                <p>If you have any questions or need support, feel free to contact us.</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'User registered, but failed to send confirmation email.' });
            }
        });

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

router.get('/polls/:pollId/check-vote', async (req, res) => {
    const { pollId } = req.params;
    const { email } = req.query;

    try {
        const poll = await Polls.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: 'Poll not found' });
        }

        const hasVoted = poll.pollOption.some(option =>
            option.timeOptions.some(time =>
                time.votes.some(vote => vote.requesterEmail === email)
            )
        );

        res.status(200).json({ hasVoted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error checking votes' });
    }
});

router.get('/polls-by-email/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const polls = await Polls.find({ hostId: user._id });

        res.status(200).json({ polls });
    } catch (error) {
        console.error('Error fetching polls:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});



module.exports = router;