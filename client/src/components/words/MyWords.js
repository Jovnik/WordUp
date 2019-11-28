import React, { useEffect, useContext, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import WordContext from '../../context/words/wordContext';
import MyWordsItem from '../../components/words/MyWordsItem';

const MyWords = () => {

    const wordContext = useContext(WordContext);

    const { myWords, loadingWords, getMyWords } = wordContext;

    useEffect(() => {
        getMyWords();
    }, []);

    return (
        <Fragment>
            { myWords !== null && !loadingWords ? (
                <div className="show-words">
                    <h1>Added <span className="text-primary">Words</span></h1>
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
