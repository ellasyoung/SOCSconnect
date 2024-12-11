//Cienna Gin-Naccarato
const mongoose = require('mongoose'); 

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, 'Please add a first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name.']
    }, 
    email: {
        type: String, 
        required: [true, 'Please add an email.']
    }, 
    password: {
        type: String, 
        required: [true, 'Please add a password.']
    }
});

module.exports = mongoose.model('Users', UsersSchema);
