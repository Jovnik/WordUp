import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const authLinks = (
    <Fragment>

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

const Navbar = ({ title, icon }) => {
    return (
        <div className="navbar bg-primary">
            <h1>
                <Link to='/'>
                    <i className={icon} /> {title}
                </Link>
            </h1>
            <ul>
                { guestLinks }
            </ul>
        </div>
    )
}

Navbar.defaultProps = {
    title: 'WordUp',
    icon: 'fas fa-level-up-alt'
}

export default Navbar
