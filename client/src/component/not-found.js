import React, { Component } from 'react';
import './not-found.css';

import { Redirect } from 'react-router-dom';

class NotFound extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      isRedirect: false
    }
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  
  componentDidMount() {
    return fetch('/hello')
      .then(res => res.json())
      .then(json => {
        this.setState({
          message: json.message
        });
      })
      .catch(err => {
        console.log(err.message);
      });
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
      <div className="jumbotron jumbotron-fluid m-0 text-center" id="not-found">
        <div className="container" id="not-found-content">
          <h1 className="display-4"><i className="fa fa-frown-o fa-lg" aria-hidden="true"></i> 404 Not Found</h1>
          <p className="lead">We couldn't find what you're looking for.</p>
          <button type="button" className="btn btn-outline-success mt-2 p-3" onClick={this.handleRedirect}>Take me to the homepage</button>
        </div>
      </div>
    );
  }
}

export default NotFound;
