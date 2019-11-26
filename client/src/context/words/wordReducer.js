import { FETCH_WORDS } from '../types';

export default (state, action) => {
    switch (action.type) {
        case FETCH_WORDS:
            return {
                ...state,
                words: action.payload
            }
        default:
        return state;
    }
};