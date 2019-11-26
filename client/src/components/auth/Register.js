import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = (props) => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated, loadUser } = authContext;

    useEffect(() => {
        console.log('Shouldnt we be going back to the home page?');
        console.log('isAuthenticated', isAuthenticated);
        if(isAuthenticated === null){
            loadUser();
        }

        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'User already exists'){
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    
    // Component level state
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = user;

    const onSubmit = (e) => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');  //remember setAlert(msg, type);
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger')
        } else {
            register({
                name,
                email,
                password
            });
        }
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }


    return (
        <div className='form-container'>
            <h1>
                <span className="text-primary">Register</span> Account
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} minLength="6"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} minLength="6"/>
                </div>
                <input type="submit" value="Register" className='btn btn-primary btn-block'/>
            </form>
        </div>
    )
}

export default Register
