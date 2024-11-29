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
            required: false
        }, 
        responseStartTime: {
            type: String, 
            required: false
        }, 
        responseEndTime: {
            type: String, 
            required: false
        }
    }, 
    createdAt:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('AlternateRequests', AlternateRequestsSchema);