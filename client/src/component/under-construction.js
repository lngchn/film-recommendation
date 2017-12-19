import React, { Component } from 'react';
import './under-construction.css';

import { Redirect } from 'react-router-dom';

class UnderConstruction extends Component {
  constructor() {
    super();
	this.state = {
      isRedirect: false
    }
  	this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(event) {
  	this.setState({isRedirect: true});
  }
  render() {
  	let isRedirect = this.state.isRedirect;

    if(isRedirect) {
      return(<Redirect to="/" />);
    }
    return(
      <div className="jumbotron jumbotron-fluid m-0 text-center" id="under-construction">
        <div className="container" id="under-construction-content">
          <h1 className="display-4"><i className="fa fa-hourglass-o fa-lg" aria-hidden="true"></i> Page Under Construction</h1>
          <button type="button" className="btn btn-outline-success mt-4 p-3" onClick={this.handleRedirect}>Take me to the homepage</button>
        </div>
      </div>
    );
  }
}

export default UnderConstruction;
