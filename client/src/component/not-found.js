import React, { Component } from 'react';

class NotFound extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
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

  render() {
    return(
      <div className="mt-5 mb-5 pt-5 pb-5 text-center">
        <h1 className="text-uppercase">404</h1>
        <h1 className="text-uppercase">Opps, Sorry We Can't Find That Page!</h1>
        <p>Either something went wrong or the page doesn't exist anymore</p>
      </div>
    );
  }
}

export default NotFound;