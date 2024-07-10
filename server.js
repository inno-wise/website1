const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const userRoutes = require('./routes/user');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/music-quiz', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
