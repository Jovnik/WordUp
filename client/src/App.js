// modules
import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';

//stylesheet
import './App.css';

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register}/>
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
