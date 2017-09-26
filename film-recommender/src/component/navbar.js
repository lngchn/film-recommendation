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
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <a className="navbar-brand text-uppercase" href="./">Film Pro</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <div className="navbar-nav">
              <NavItem name="Recommendation" active={this.state.active} onClick={value => this.handleClick("Recommendation")} />
              <NavItem name="Activity" active={this.state.active} onClick={value => this.handleClick("Activity")} />
              <NavItem name="People" active={this.state.active} onClick={value => this.handleClick("People")} />
            </div>
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <input className="form-control mr-sm-2" type="text" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;