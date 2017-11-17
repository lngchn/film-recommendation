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
          <h1 className="text-white text-center">Create an account</h1>
          <div className="row">
            <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} className="form-control col-12 mb-3" id="username-register" required/>
            <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} className="form-control col-12 mb-3" id="email-register" required/>
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control col-12 mb-3" id="password-register" required/>
            <input type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} className="form-control col-12 mb-3" id="confirm-password-register" required/>
            <button type="submit" className="btn btn-success col-4 mb-3 mx-auto">Register</button>
            <span className="col-12 text-white text-center">Already have an account? <a href="/login">Login</a></span>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;