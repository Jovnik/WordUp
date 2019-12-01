const mongoose = require('mongoose');

const WordSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    partOfSpeech: {
        type: String,
        required: true
    },
    definitions: {
        type: [String],
        required: true
    },
    examples: {
        type: String
    },
    importance: {
        type: String    //just came across the word, getting comfortable, its part of my vocabulary now
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('word', WordSchema);

