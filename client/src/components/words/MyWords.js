import React, { useEffect, useContext, Fragment, useState } from 'react';
import Spinner from '../layout/Spinner';
import WordContext from '../../context/words/wordContext';
import MyWordsItem from '../../components/words/MyWordsItem';

const MyWords = () => {

    const wordContext = useContext(WordContext);

    const { myWords, loadingWords, getMyWords } = wordContext;

    // const [displayWords, setDisplayWords] = useState(myWords);

    useEffect(() => {
        getMyWords();
    }, []);


    const sortAZ = () => {
        //possible dispatch here to change some sort of sortBy state
    }

    const sortZA = () => {

    }
    
    return (
        <Fragment>
            { myWords !== null && !loadingWords ? (
                <div className="show-words">
                    <h1>My <span className="text-primary">Words</span></h1>
                    <div className="sort-options">
                        <p>Sort By: </p>
                        <p onClick={sortAZ}><b>A-Z</b></p>
                        <p onClick={sortZA}><b>Z-A</b></p>
                    </div>
                    {myWords.map((word, index) => (
                        <MyWordsItem key={index} word={word} />
                    ))}
                </div>
            ) : (
                <Spinner />
            )}
        </Fragment>
    )
}

export default MyWords
