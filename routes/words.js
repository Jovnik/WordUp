const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const mongoose = require('mongoose');
// const { appID, appKey } = config.get ??
const appID = config.get('appID');
const appKey = config.get('appKey');
const Word = require('../models/Word');
const auth = require('../middleware/auth');


router.get('/getwords', auth, async(req, res) => {
    console.log('server');

    try {
        const words = await Word.find({ user: req.user.id }).sort({ date: -1 });
        res.json(words);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/', async(req, res) => {

    try {
        const headers = {
            "Accept": "application/json",
            "app_id": appID,
            "app_key": appKey
        }

        const { word } = req.body;
        // console.log(word);

        const url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?fields=definitions%2Cexamples%2Cpronunciations&strictMatch=false`;

        const response = await axios.get(url, { headers });

        const wordResponse = response.data.results;

        const words = [];   //this will be an array containing objects with the relevant information
        // need to iterate through the data to get it into the form that we want

        let newWord = { 
            name: null,
            partOfSpeech: null,
            audioPronunciation: null,
            definitions: null,
            examples: null
        };

        wordResponse.forEach(word => {
            let wordName = word.id;

            word.lexicalEntries.forEach(entry => {
                // this is where we need to create the new word

                const wordInput = { ... newWord };  //copy the empty word 

                wordInput.partOfSpeech = entry.lexicalCategory.id;
                wordInput.name = wordName;
                wordInput.audioPronunciation = entry.pronunciations[0].audioFile;

                entry.entries[0].senses.forEach(x => {
                    wordInput.definitions = x.definitions;
                    wordInput.examples = x.examples;
                })

                words.push(wordInput);

            })
        })

        // by this point we now have all the word variations for the word that was searched
        // console.log(words);

        res.json({ data: words });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: 'There was an error' });
    }
});


router.post('/addWord', auth, async(req, res) => {
    const { word } = req.body;

    try {
        let addWord = await Word.findOne({user: req.user.id, name: word.name, definitions: word.definitions});

        if(addWord){   // if the user already has that word
            console.log('That word already exists');
            return res.json({ msg: 'You have already added that word', type: 'dark' })
        }
        
        const newWord = {};
        newWord.user = req.user.id;
        newWord.name = word.name;
        newWord.partOfSpeech = word.partOfSpeech;
        newWord.definitions = word.definitions;
        if(word.examples) newWord.examples = word.examples[0].text;

        addWord = new Word(newWord);
        
        await addWord.save();

        res.json({ msg: 'Word added successfully', type: 'success' })
        
    } catch (err) {
        res.json({ msg: 'There was an error'})
        
    }



})

module.exports = router;