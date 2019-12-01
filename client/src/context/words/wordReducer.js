import { 
    FETCH_WORDS,
    FETCH_WORDS_ERROR,
    SET_FINDING_WORDS,
    GET_WORDS,
    DELETE_WORD
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_WORDS:
            return {
                ...state,
                myWords: action.payload,
                loadingWords: false
            }
        case FETCH_WORDS:
            return {
                ...state,
                words: action.payload,
                findingWords: false,
                searched: true
            }
        case FETCH_WORDS_ERROR:
            return {
                ...state,
                words: [],
                findingWords: false,
                searched: true
            }
        case DELETE_WORD:
            return {
                ...state,
                myWords: state.myWords.filter(word => word._id !== action.payload)
            }
        case SET_FINDING_WORDS:
            return {
                ...state,
                findingWords: true,
            }
        default:
        return state;
    }
};