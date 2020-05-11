import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {  }

  loginHandler() {

  }

  registerHandler() {

  }

  submitHandler = event => {
    event.preventDefault();
  }

  render() { 
    return (
      <div className={classes.Auth}>
        <div className={classes.AuthWrapper}>
          <h1>Authentication</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            <input/>
            <input/>
            <Button
              type="success"
              onClick={this.loginHandler}
            >
              Log in
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
