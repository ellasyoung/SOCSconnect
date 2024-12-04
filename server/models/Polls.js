const mongoose = require('mongoose');

const PollsSchema = new mongoose.Schema({
    title:{
        type: String, 
        default: ''
    }, 
    hostId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users", 
        required: true
    }, 
    pollOption: [
        {
            date: {
                type: Date,
            }, 
            timeOptions: [
                {
                    startTime: {
                        type: String, 
                        required: true
                    }, 
                    endTime: {
                        type: String, 
                        required: true
                    }, 
                    votes: [
                        {
                            requesterEmail: {
                                type: String,
                            }, 
                        }
                    ]
                }
            ]
        }
    ],
    url: {
        type: String,
        required: [true, 'Please add the poll URL.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 

module.exports = mongoose.model('Polls', PollsSchema);