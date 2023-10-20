const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, 'please typing user id!'],
    },
    token: {
        type: String,
        required: [true, 'please typing name project!'],
    },
});

const matches = mongoose.model('match', matchSchema);

module.exports = matches;
