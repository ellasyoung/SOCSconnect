const mongoose = require('mongoose')

const AlternateRequestsSchema = new mongoose.Schema({
    requesterId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users", 
        required: true
    }, 
    hostId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users", 
        required: true
    }, 
    alternateTimes: [
        {
            proposedDate: {
                type: Date, 
                required: true
            }, 
            proposedStartTime: {
                type: String, 
                required: true
            }, 
            proposedEndTime: {
                type: String, 
                required: true
            }
                
        }
    ], 
    requestStatus: {
        type: String, 
        default: 'Pending'
    }, 
    hostResponse: {
        responseDate: {
            type: Date, 
            required: true
        }, 
        responseStartTime: {
            type: String, 
            required: true
        }, 
        responseEndTime: {
            type: String, 
            required: true
        }
    }, 
    createdAt:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('AlternateRequests', AlternateRequestsSchema);