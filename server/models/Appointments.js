const mongoose = require('mongoose');

const AppointmentsSchema = new mongoose.Schema({
    hostId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users",
        required: true
    }, 
    title: {
        type: String, 
        default: ''
    }, 
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
    url: {
        type: String, 
        required: [true, 'Please add the booking url.']
    }, 
    maxNumParticipants: {
        type: Number, 
        default: 1
    }, 
    bookings: [
        {
            requesterEmail: {
                type: String
            }, 
            bookingTime:{
                type: Date, 
                default: Date.now
            }
        }
    ], 
    createdAt: {
        type: Date, 
        default: Date.now
    }

});

module.exports = mongoose.model('Appointments', AppointmentsSchema);