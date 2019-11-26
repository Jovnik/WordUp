import React, { Fragment, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';


const Home = () => {
    const authContext = useContext(AuthContext);

    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <h1>This is the home page</h1>
        </Fragment>
    )
}

export default Home
