import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import Logo from '../img/film_pro_logo.png';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.searchValue);
  }

  render() {
    return(
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a className="navbar-brand text-uppercase" href="./"><img src={Logo} width="100" height="13" alt="Film Pro" /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <div className="navbar-nav mr-md-3">
                <NavLink to="/recommendation" className="nav-item nav-link text-uppercase">Recommendation</NavLink>
                <NavLink to="/activity" className="nav-item nav-link text-uppercase">Activity</NavLink>
                <NavLink to="/people" className="nav-item nav-link text-uppercase">People</NavLink>
              </div>
              <div className="btn-group mr-md-4" role="group">
                <button id="btnGroupDrop1" type="button" className="btn btn-outline-info dropdown-toggle text-uppercase" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Add a Film
                </button>
                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <a className="dropdown-item" href="#">Dropdown link</a>
                  <a className="dropdown-item" href="#">Dropdown link</a>
                </div>
              </div>
              <form className="form-inline px-auto px-md-0 mt-3 mt-md-0" onSubmit={this.handleSubmit}>
                <input className="form-control col-8" type="text" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success col-4" type="submit">Search</button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;