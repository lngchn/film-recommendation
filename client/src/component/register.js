import React, { Component } from 'react';
import './register.css';

import { Redirect } from 'react-router-dom';
import FormValidation from '../helperFunctions/formValidation';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoggedIn: false
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    FormValidation('register-form');
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange(event) {
    this.setState({confirmPassword: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let {username, email, password, confirmPassword} = this.state;
    fetch("/register", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username, email, password, confirmPassword
      })
    })
    .then(res => {
      if(res.status === 200) {
        this.setState({isLoggedIn: true});
        this.props.onAuthChange(true);
      } else {
        // Need to implement feedback as to why registration fails. 
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  render() {
    let isLoggedIn = this.state.isLoggedIn;

    if(isLoggedIn) {
      return(<Redirect to="/" />);
    }

    return(
      <form onSubmit={this.handleSubmit} className="jumbotron jumbotron-fluid m-0" id="register-form" noValidate>
        <div className="container" id="register-form-content">
          <div className="form-group row justify-content-center">
            <label htmlFor="username-register" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-4">
              <input type="text" value={this.state.username} onChange={this.handleUsernameChange} className="form-control" id="username-register" required/>
            </div>
          </div>      
          <div className="form-group row justify-content-center">
            <label htmlFor="email-register" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-4">
              <input type="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" id="email-register" required/>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <label htmlFor="password-register" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-4">
              <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" id="password-register" required/>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <label htmlFor="confirm-password-register" className="col-sm-2 col-form-label">Confirm Password</label>
            <div className="col-sm-4">
              <input type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} className="form-control" id="confirm-password-register" required/>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <div className="col-sm-2">
              <button type="submit" className="btn btn-success">Register</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;