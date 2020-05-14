import React, { Component } from 'react';
import is from 'is_js';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './Auth.module.css';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Please enter correct email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Please enter correct password',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
          },
        },
      },
    };
  }


  submitHandler = (event) => {
    event.preventDefault();
  }

  onChangeHandler = (event, controlName) => {
    const { formControls } = this.state;

    const formControlsCopy = { ...formControls };

    const control = { ...formControlsCopy[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControlsCopy[controlName] = control;

    let isFormValid = true;

    Object.keys(formControlsCopy).forEach((name) => {
      isFormValid = formControlsCopy[name].valid && isFormValid;
    });

    this.setState({
      formControls: formControlsCopy,
      isFormValid,
    });
  }

  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid;
    }

    return isValid;
  }


  loginHandler() {

  }

  registerHandler() {

  }

  renderInputs() {
    const { formControls } = this.state;
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + String(index)}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    const { isFormValid } = this.state;
    return (
      <div className={classes.Auth}>
        <div className={classes.AuthWrapper}>
          <h1>Authentication</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {
              this.renderInputs()
            }
            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!isFormValid}
            >
              Log in
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!isFormValid}
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
