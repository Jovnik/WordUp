import React, { Fragment, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import WordSearch from '../words/WordSearch';
import Words from '../words/Words';
import Alerts from '../layout/Alerts';



const Home = () => {
    const authContext = useContext(AuthContext);

    // const { error, setAlert } = alertContext;
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <WordSearch />
        </Fragment>
    )
}

export default Home
