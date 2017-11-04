import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Logo from '../img/film_pro_logo.png';
import SearchBar from './searchbar';

import FormValidation from '../helperFunctions/formValidation';

function LoggedInNavbar(props) {
  return (
    <div className="row">
      <div className="col">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand text-uppercase mr-5" href="./"><img src={Logo} width="100" height="13" alt="Film Pro" /></a>
          <SearchBar />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <div className="navbar-nav mr-md-3">
              <NavLink to="/recommendation" className="nav-item nav-link text-uppercase">Recommendation</NavLink>
              <NavLink to="/activity" className="nav-item nav-link text-uppercase">Activity</NavLink>
              <NavLink to="/people" className="nav-item nav-link text-uppercase">People</NavLink>
            </div>
            <div className="btn-group mr-md-1" role="group">
              <button id="navbarLoggedIn" type="button" className="btn btn-outline-info dropdown-toggle text-uppercase" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-bars" aria-hidden="true"></i>
              </button>
              <div className="dropdown-menu" id="navSettingButton" aria-labelledby="navbarLoggedIn">
                <a className="dropdown-item" href="#">Profile</a>
                <a className="dropdown-item" href="#">Setting</a>
                <a className="dropdown-item" href="#" onClick={props.onLogoutClick}>Logout</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

function LoggedOutNavbar(props) {
  return(
    <div className="row">
      <div className="col">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand text-uppercase mr-5" href="./"><img src={Logo} width="100" height="13" alt="Film Pro" /></a>
          <SearchBar />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-nav ml-auto">
            <div className="nav-item dropdown ml-auto">
              <button className="btn btn-outline-info dropdown-toggle" type="button" id="navLogin" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Login
              </button>
              <div className="dropdown-menu dropdown-menu-right p-4" id="navLoginDiv" aria-labelledby="navLogin">
                <form onSubmit={props.onSubmit} className="form" id="navLoginForm" noValidate> 
                  <input className="form-control mb-2" type="email" value={props.email} onChange={props.onEmailChange} placeholder="Email" required />
                  <input className="form-control mb-2" type="password" value={props.password} onChange={props.onPasswordChange} placeholder="Password" required />
                  <button className="btn btn-secondary" type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthed: false,
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    FormValidation('navLoginForm');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isAuthed: nextProps.isAuthed});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let {email, password} = this.state;
    fetch("/login", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      // This is the body parameter
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => {
      if(res.status === 200) {
        this.setState({isAuthed: true});
        this.props.onAuthChange(true);
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  handleLogout(event) {
    event.preventDefault();
    fetch("/logout", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin"
    })
    .then(res => {
      if(res.status === 200) {
        this.props.onAuthChange(false);
        this.setState({isAuthed: false});
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  render() {
    let isAuthed = this.state.isAuthed;

    return(
      isAuthed ? <LoggedInNavbar onLogoutClick={this.handleLogout} /> 
               : <LoggedOutNavbar onSubmit={this.handleSubmit} 
                                  onEmailChange={this.handleEmailChange} 
                                  onPasswordChange={this.handlePasswordChange} 
                                  email={this.state.email} 
                                  password={this.state.password} />
    );
  }
}

export default Navbar;