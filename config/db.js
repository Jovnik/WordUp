const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully ✔️✔️');
    } catch(err) {
        console.error(err.message);
        process.exit(1);    //kill the process if you cant connect to atlas
    }
}

module.exports = connectDB;