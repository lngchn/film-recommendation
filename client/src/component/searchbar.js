import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("/search", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: this.state.query
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);  // need a way to display the result to users
    });
  }

  render() {
    return(
      <form className="form-inline px-auto px-md-0 mt-3 mt-md-0" onSubmit={this.handleSubmit}>
        <input className="form-control col-8" type="text" value={this.state.query} onChange={this.handleChange} placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success col-4" type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;