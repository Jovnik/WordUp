import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
    switch(action.type){
        case SET_ALERT:
            return [...state, action.payload];  // spread rest of the state array (alert initial state is an array) and add the new alert
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload)
        default:
            return state;
    }
}