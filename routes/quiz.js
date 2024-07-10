const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const categories = ['Pop', 'Rock', 'Classical', 'Jazz']; // Example categories

// Get quiz categories
router.get('/categories', (req, res) => {
    res.json(categories);
});

// Submit quiz score
router.post('/submit', async (req, res) => {
    const { score } = req.body;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).send('Not authenticated');
    }

    const quiz = new Quiz({ user: userId, score, date: new Date() });
    await quiz.save();

    const user = await User.findById(userId);
    user.quizHistory.push(quiz);

    // Add achievements based on score
    if (score >= 10) {
        user.achievements.push('Quiz Master');
    } else if (score >= 5) {
        user.achievements.push('Quiz Enthusiast');
    } else {
        user.achievements.push('Quiz Novice');
    }

    await user.save();

    res.send('Quiz score saved');
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
    const topScores = await Quiz.find().sort({ score: -1 }).limit(10).populate('user');
    const leaderboard = topScores.map(entry => ({
        username: entry.user.username,
        score: entry.score
    }));

    res.json(leaderboard);
});

// Get quiz questions based on category
router.get('/questions', (req, res) => {
    const { category } = req.query;

    // Example questions categorized
    const questions = {
        'Pop': [
            { type: 'multiple-choice', question: "Who is the 'King of Pop'?", options: ["Michael Jackson", "Elvis Presley", "Prince"], correct: 0 },
            { type: 'true-false', question: "The Beatles are a British band.", correct: true },
        ],
        'Rock': [
            { type: 'multiple-choice', question: "Which band released the album 'Dark Side of the Moon'?", options: ["The Beatles", "Pink Floyd", "Led Zeppelin"], correct: 1 },
        ],
        'Classical': [
            { type: 'multiple-choice', question: "Who composed 'The Four Seasons'?", options: ["Bach", "Vivaldi", "Mozart"], correct: 1 },
        ],
        'Jazz': [
            { type: 'true-false', question: "Miles Davis is known for his work in Jazz.", correct: true },
        ]
    };

    res.json(questions[category] || []);
});

module.exports = router;
