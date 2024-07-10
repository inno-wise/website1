const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);
