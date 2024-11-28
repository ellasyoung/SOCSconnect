const mongoose = require('mongoose');

const SessionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d', 
    },
});

module.exports = mongoose.model('Sessions', SessionsSchema);
