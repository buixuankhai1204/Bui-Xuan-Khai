const mongoose = require('mongoose');

const topScoresSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: [true, 'please typing userId!'],
    },
    score: {
        type: Number,
        required: [true, 'please typing name project!'],
    },
});

const todoList = mongoose.model('topScore', topScoresSchema);

module.exports = todoList;
