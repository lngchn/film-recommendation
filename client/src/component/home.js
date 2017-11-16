import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  render() {
    return(
      <div className="jumbotron jumbotron-fluid m-0" id="home-background">
        <div className="container text-light text-center" id="home-content">
          <h1 className="display-3">WELCOME TO FILM PRO!</h1>
          <p className="lead text-left">Film Pro is the perfect guide for your adventures in
movie watching. <br />If you're feeling adventurous, click below to begin your journey into cinema! 
      </p>
          <p className="lead">
            <a className="btn btn-light btn-lg" href="/register" role="button">Get Started</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
