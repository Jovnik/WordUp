// modules
import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';


// States
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import WordState from './context/words/WordState';
import setAuthToken from './utils/setAuthToken';

//stylesheet
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <WordState>
          <Fragment>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
              </Switch>
            </div>
          </Fragment>
        </WordState>
      </AlertState>
    </AuthState>
  );
}

export default App;
