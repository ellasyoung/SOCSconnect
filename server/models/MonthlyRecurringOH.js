//Cienna Gin-Naccarato
const mongoose = require('mongoose');

const MonthlyOfficeHoursSchema = new mongoose.Schema({
    title:{
        type: String, 
        default: ''
    }, 
    hostId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users", 
        required: true
    }, 
    schedule:{
        day:{
            type: String,
        }, 
        week:{
            type: String,
        }, 
        date:{
            type: String,
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
            requesterEmail: {
                type: String,
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

module.exports = mongoose.model('MonthlyOfficeHours', MonthlyOfficeHoursSchema);
