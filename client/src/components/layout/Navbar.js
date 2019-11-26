import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
    }

    const authLinks = (
        <Fragment>
            <li>Hello { user && user.name }</li>
                {/* <li>
                    <Link to='/about'>About</Link>
                </li> */}
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className="fas fa-sign-out-alt"></i>{' '} <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )
    
    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <Link to='/'>
                    {title} <i className={icon} />
                </Link>
            </h1>
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </div>
    )
}

Navbar.defaultProps = {
    title: 'WordUp',
    icon: 'fas fa-level-up-alt'
}

export default Navbar
