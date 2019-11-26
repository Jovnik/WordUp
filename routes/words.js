const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
// const { appID, appKey } = config.get ??
const appID = config.get('appID');
const appKey = config.get('appKey');

router.get('/getwords', (req, res) => {

    // let url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/adroit?fields=definitions&strictMatch=false`

    // let headers = {"Accept": "application/json",
    //                 "app_id": app_id,
    //                 "app_key": app_key};

    // let response = await fetch(url, {headers: headers});
    // let data = await response.json();
    // word = data.results;

    // console.log(word[0]);
    console.log('does this even get hit??');

    res.json({ msg: 'Hello' });

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
})

module.exports = router;