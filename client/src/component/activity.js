import React, { Component } from 'react';
import './activity.css';

class Activity extends Component {
  render() {
    return(
      <div className="jumbotron jumbotron-fluid m-0 text-center" id="under-construction">
        <div className="container" id="not-found-content" id="under-construction-content">
          <h1 className="display-4"><i className="fa fa-hourglass-o fa-lg" aria-hidden="true"></i> Page Under Construction</h1>
          <button type="button" className="btn btn-outline-success mt-4 p-3">Take Me To The Homepage</button>
        </div>
      </div>
    );
  }
}

export default Activity;