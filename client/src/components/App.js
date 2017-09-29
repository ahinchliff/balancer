import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import HomePage from './home/HomePage'
import SignupLoginPage from './signupLogin/SignupLoginPage';
import requireAuth from './misc/requireAuth';
import Index from './Index';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="blue-grey lighten-5" style={{height: '100vh'}}>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Index} />
            <Route exact path="/home" component={requireAuth(HomePage)} />
            <Route exact path="/register" 
              render={props => <SignupLoginPage action="Register" {...props}/>} 
            />
            <Route exact path="/login" 
              render={props => <SignupLoginPage action="Login" {...props}/>} 
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default connect(null, actions)(App);