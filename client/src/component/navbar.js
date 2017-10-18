import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Logo from '../img/film_pro_logo.png';
import SearchBar from './searchbar';

function CreateNavbarDropDown(props) {
  var user = false;

  if(user) {
    return (
      <div className="btn-group mr-md-4" role="group">
        <button id="navbarLoggedIn" type="button" className="btn btn-outline-info dropdown-toggle text-uppercase" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Username
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarLoggedIn">
          <a className="dropdown-item" href="#">Profile</a>
          <a className="dropdown-item" href="#">Setting</a>
          <a className="dropdown-item" href="#">Logout</a>
        </div>
      </div>
    )
  }

  return (
    <div className="btn-group mr-md-4" role="group">
      <button type="button" className="btn btn-outline-info text-uppercase">
        Login
      </button>
    </div>
  )
}

class Navbar extends React.Component {
  render() {
    return(
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
              <CreateNavbarDropDown />
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;