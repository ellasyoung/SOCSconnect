//Cienna Gin-Naccarato
const mongoose = request('mongoose')

const BookingTypeSchema = new mongoose.Schema({
    bookingType: { type: String, 
        required: true }, 
   
  });
const BookingType = mongoose.model('BookingType', BookingTypeSchema);

const BookingsSchema = new mongoose.Schema({
    requesterId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Users"
    },
    guest: {
        firstName:{
            type: String
        }, 
        lastName:{
            type: String
        }, 
        email: {
            type: String
        }
    }, 
    bookingType: {
        type: String, 
        required: true
    }, 
    //actual id of referenced Booking 
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    // id of the reference type (ie. Weekly/Monthly Booking)
    referenceType: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BookingType',  
    required: true 
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
    createdAt: {
        type: Date,
        default: Date.now
    }

});

//to dynamically pick bookingType 
BookingSchema.virtual('reference', {ref: function(){
    return this.bookingType;
}, 
localField: "referenceId", 
foreignField: '_id', 
justOne: true
}); 

const Booking = mongoose.model('Bookings', BookingsSchema);

module.exports ={Booking, BookingType}