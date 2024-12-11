//Cienna Gin-Naccarato
const mongoose = request('mongoose')

const MeetingPollsSchema = new mongoose.Schema({
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", 
        required: true
    }, 
    pollTitle: {
        type: String, 
        required: true
    }, 
    url: { 
        type: String, 
        required: [true, 'Please add the booking URL.']
    }, 
    pollOptions: [
        {
            date: {
                type: Date,
                required: true
            }, 
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
                    requesterId:{
                        type: mongoose.Schema.Types.ObjectId, 
                    }
                }
            ]
        }
    ], 
    createdAt: {
        type: Date, 
        default: Date.now
    }
}); 

module.exports = mongoose.model('MeetingPolls', MeetingPollsSchema);