const mongoose = require('mongoose'); 

const WeeklyOfficeHoursSchema = new mongoose.Schema ({
    hostId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users", 
        required: true
    }, 
    title:{
        type: String, 
        default: ''
    },
    schedule:{
        dayOfWeek: {
            type: String, 
            required: [true, 'Please add a day of the week when the meeting will recurr.']
        }, 
        startTime: {
            type: String,
            required: true,
        }, 
        endTime: {
            type: String, 
            required: true
        }, 
        startDate:{
            type: Date, 
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    }, 
    bookSlot: [
        {
            date: {
                type: Date,
            }, 
            bookingCreated: { 
                type: Date, 
                default: Date.now
            },
            requesterEmail: {
                type: String,
            },
        }
    ], 
    url: {
        type: String,
    },
    maxNumParticipants: {
        type: Number, 
        default: 1
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('WeeklyOfficeHours', WeeklyOfficeHoursSchema);