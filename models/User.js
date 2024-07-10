const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quizHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    achievements: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
