const express = require('express');
const connectDB = require('./config/db');

const app = express();

// test route
app.get('/test', (req, res) => {
    res.json({ msg: 'This test is working'});
});

connectDB();

// Express middleware
app.use(express.json());

// ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'))
app.use('/api/words', require('./routes/words'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server running on port ${PORT} ✔️`)});

