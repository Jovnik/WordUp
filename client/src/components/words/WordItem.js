import React, { useContext } from 'react';
import WordContext from '../../context/words/wordContext';
import axios from 'axios';

const WordItem = ({ word }) => {
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
                <h2 className="text-primary">{word.name} <i>({word.partOfSpeech})</i></h2>
                <p>{word.definitions[0]}</p>
                {word.examples && <p>eg. {word.examples[0].text}</p>}
            </div>
            <div className="word-add">
                <i onClick={handleClick} className="fas fa-plus fa-2x add-btn"></i>
            </div>
        </div>
    )
}

export default WordItem
