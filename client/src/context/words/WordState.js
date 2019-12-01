import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import WordContext from './wordContext';
import wordReducer from './wordReducer';
import AlertContext from '../alert/alertContext';   // Note: you can use a context within another context

import {
    FETCH_WORDS,
    FETCH_WORDS_ERROR,
    SET_FINDING_WORDS,
    GET_WORDS,
    DELETE_WORD
} from '../types';

const WordState = props => {
    const initialState = {
        findingWords: false,
        searched: false,
        words: [],
        myWords: null,
        loadingWords: true
    };

    const [state, dispatch] = useReducer(wordReducer, initialState);

    // Use alert context within another context?
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const getResults = async(word) => {
        setFindingWords();
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
            dispatch({
                type: FETCH_WORDS_ERROR,
            })
            console.log('Need to dispatch here to set some sort of flag saying there were no results');
        }
    }

    const setFindingWords = () => {
        dispatch({
            type: SET_FINDING_WORDS
        })
    }

    const addWord = async(word) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let alert;

        try {
            const resp = await axios.post('/api/words/addWord', { word }, config);
            
            console.log(resp);

            alert = { ... resp.data }

            setAlert(alert.msg, alert.type);
        } catch (err) {
            // console.log('Error adding the word');    //this will be a server error from the backend
        }
    }

    const removeWord = async(wordID, wordName) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const resp = await axios.post('/api/words/remove-word', { wordID, wordName }, config);

            const alert = { ... resp.data };

            setAlert(alert.msg, alert.type);

            dispatch({
                type: DELETE_WORD,
                payload: wordID
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    const getMyWords = async() => {
        try {
            const resp = await axios.get('/api/words/getwords');

            dispatch({
                type: GET_WORDS,
                payload: resp.data
            })
            console.log(resp);
        } catch (err) {
            console.error(err.message);
        }

    }

    return (
        <WordContext.Provider
         value={{
            findingWords: state.findingWords,
            searched: state.searched,
            words: state.words,
            myWords: state.myWords,
            loadingWords: state.loadingWords,
            getResults,
            getMyWords,
            addWord,
            removeWord
         }}>
            { props.children }
        </WordContext.Provider>
    );
};

export default WordState;