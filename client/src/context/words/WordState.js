import React, { useReducer } from 'react';
import axios from 'axios';
import WordContext from './wordContext';
import wordReducer from './wordReducer';

import {

} from '../types';

const WordState = props => {
    const initialState = {
        findingWords: false,
        words: null
    };

    const [state, dispatch] = useReducer(wordReducer, initialState);
   

    return (
        <WordContext.Provider
         value={{
            findingWords: state.findingWords,
            words: state.words
         }}>
            { props.children }
        </WordContext.Provider>
    );
};

export default WordState;