const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    updated_at: {
        date: Date
    },
    message: {
        type: String,
    },
    talkto: {
        type: String,
    },
});

module.exports = mongoose.model('Chat', ChatSchema);