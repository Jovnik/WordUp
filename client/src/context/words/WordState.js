import React, { useReducer } from 'react';
import axios from 'axios';
import WordContext from './wordContext';
import wordReducer from './wordReducer';

import {
    FETCH_WORDS
} from '../types';

const WordState = props => {
    const initialState = {
        findingWords: false,
        words: null
    };

    const [state, dispatch] = useReducer(wordReducer, initialState);

    const getResults = async(word) => {
        console.log('getting the results');

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            
            const res = await axios.post('/api/words', { word } , config);

            dispatch({
                type: FETCH_WORDS,
                payload: res.data.data
            })
            // dispatch here to update words state
            // console.log('Res', res.data.data);

        } catch (err) {
            console.log('Need to dispatch here to set some sort of flag saying there were no results');
        }

    }
   

    return (
        <WordContext.Provider
         value={{
            findingWords: state.findingWords,
            words: state.words,
            getResults
         }}>
            { props.children }
        </WordContext.Provider>
    );
};

export default WordState;