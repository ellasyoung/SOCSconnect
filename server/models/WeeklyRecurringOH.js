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
            requesterId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users", 
            }, 
            bookingCreated: { 
                type: Date, 
                default: Date.now
            }
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
    }
});

module.exports = mongoose.model('WeeklyOfficeHours', WeeklyOfficeHoursSchema);