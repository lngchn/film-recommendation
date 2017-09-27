import React from 'react';
import './navbar.css';

function NavItem(props) {
  const name = props.name;
  const active = props.active;

  if(name === active) {
    return (
      <a className="nav-item nav-link text-uppercase active" href="#" onClick={props.onClick}>{name}<span className="sr-only">(current)</span></a>
    );
  }
  return (
    <a className="nav-item nav-link text-uppercase" href="#" onClick={props.onClick}>{name}</a>
  );
}

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      active: "Recommendation",
      searchValue: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(value) {
    const active = value;
    this.setState({
      active
    });
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
            <a className="navbar-brand text-uppercase" href="./">Film Pro</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <div className="navbar-nav mr-auto">
                <NavItem name="Recommendation" active={this.state.active} onClick={value => this.handleClick("Recommendation")} />
                <NavItem name="Activity" active={this.state.active} onClick={value => this.handleClick("Activity")} />
                <NavItem name="People" active={this.state.active} onClick={value => this.handleClick("People")} />
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