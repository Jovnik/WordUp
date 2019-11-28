import React, { useContext } from 'react';
import WordContext from '../../context/words/wordContext';
import axios from 'axios';

const MyWordsItem = ({ word }) => {
    const wordContext = useContext(WordContext);

    const { addWord } = wordContext;

    console.log(word);

    const handleClick = () => {
        console.log('click');
        addWord(word);

    }

    return (
        <div className="word-container">
            <div className="word-info">
                <h3 className="text-primary">{word.name}</h3>
                <p>Part of Speech: <b>{word.partOfSpeech}</b></p>
                <p><b>{word.definitions[0]}</b></p>
                { word.examples && <p>eg. <i>{word.examples}</i></p> }
            </div>
        </div>
    )
}

export default MyWordsItem
