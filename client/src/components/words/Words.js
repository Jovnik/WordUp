import React, { useContext, Fragment } from 'react';
import WordContext from '../../context/words/wordContext';
import WordItem from '../words/WordItem';
import Spinner from '../layout/Spinner';

// bring in the spinner and the loading section;

const Words = () => {

    const wordContext = useContext(WordContext);

    const { findingWords, searched, words } = wordContext;


    if(findingWords){
        return (
            <Spinner />
        )
    } 
    else if (searched) {
        if (words.length === 0){
            return (
                <h1>Whoops, we couldnt find any results matching your search</h1>
            )
        } else {
            return (
                <div className="show-words">
                    {words.map((word, index) => (
                        <WordItem key={index} word={word} />
                    ))}
                </div>
            )
        }
    } else {
        return (
            <Fragment></Fragment>
        )
    }
}

export default Words
