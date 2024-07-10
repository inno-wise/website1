const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/profile', async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).send('Not authenticated');
    }

    const user = await User.findById(userId).populate('quizHistory');
    res.json({
        username: user.username,
        quizHistory: user.quizHistory.map(quiz => ({
            score: quiz.score,
            date: quiz.date
        })),
        achievements: user.achievements
    });
});

module.exports = router;
