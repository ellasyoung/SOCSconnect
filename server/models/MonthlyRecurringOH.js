const mongoose = require('mongoose');

const MonthlyOfficeHoursSchema = new mongoose.Schema({
    title:{
        type: String, 
        default: ''
    }, 
    schedule:{
        dayOrNum:{
            type: String,
            required: true
        }, 
        recurringSlot: {
            type: [Date], 
            required: true
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
                required: true
            }, 
            requesterId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', 
                required: true
            }, 
            bookingCreated: { 
                type: Date, 
                default: Date.now
            }
        }
    ],
    url: {
        type: String,
        required: [true, 'Please add the booking URL.']
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

module.exports = mongoose.model('MonthlyOfficeHours', MonthlyOfficeHoursSchema);
