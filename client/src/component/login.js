import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var {email, password} = this.state;
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className="jumbotron jumbotron-fluid m-0" id="login-form" noValidate>
        <div className="container" id="login-form-content">
          <div className="form-group row justify-content-center">
            <label htmlFor="email-login" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-4">
              <input type="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" id="email-login" required/>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <label htmlFor="password-login" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-4">
              <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" id="password-login" required/>
            </div>
          </div>
          <div className="form-group row justify-content-center">
            <div className="col-sm-2">
              <button type="submit" className="btn btn-success">Login</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;