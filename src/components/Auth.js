import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import AuthNav from './Auth/AuthNav';
import IfRedirect from './helpers/ConditionalRedirect';
import firebase from '../firebase/index';
import store from '../store';
import { signin } from '../actions/AuthActions';

const Auth = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signupError: '',
      loginError: '',
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  dispatchSignin() {
    this.props.dispatch(signin());
  }

  signup(email, password) {
    this.state.signupError = '';
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(err => this.setState({ signupError: err }))
      .then(() => {
        if(!this.state.signupError) {
          this.setState({ signupError: { message: 'Success' }});
          this.dispatchSignin();
        }
      });
  }

  login(email, password) {
    this.state.loginError = '';
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.setState({ loginError: err })
      })
      .then(() => {
        if(!this.state.loginError) {
          this.setState({ loginError: { message: 'Success' }});
          this.dispatchSignin();
        }
      });
  }

  render() {
    return (
      <div>
        <IfRedirect
          if={this.props.loggedIn}
          ifTrue="/dashboard"
        />
        <AuthNav {...this.props} />
        <Route
          path={`${this.props.match.path}/login`}
          render={renderProps => (
            <Login
              {...renderProps}
              login={this.login}
              error={this.state.loginError}
            />
          )}
        />
        <Route
          path={`${this.props.match.path}/signup`}
          render={renderProps => (
            <Signup
              {...renderProps}
              signup={this.signup}
              error={this.state.signupError}
            />
          )}
        />
      </div>
    );
  }
}

export default Auth;
