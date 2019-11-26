import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
  } from '../types';


const AlertState = props => {
    const initialState = [];    //going to be an array of alert objects

    const [state, dispatch] = useReducer(alertReducer, initialState);

   
    // Set Alert
    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuid.v4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
    }

    return (
        <AlertContext.Provider      //the context file you make (with 3 lines) supplies the provider here
         value={{
            alerts: state,
            setAlert
         }}>
            { props.children }
        </AlertContext.Provider>
    );
};

export default AlertState;