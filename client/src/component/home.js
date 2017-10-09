import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  render() {
    return(
      <div className="jumbotron jumbotron-fluid m-0" id="home-background">
        <div className="container text-light text-center" id="home-content">
          <h1 className="display-3">Welcome to Film Pro!</h1>
          <p className="lead text-left">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
          <p className="lead">
            <a className="btn btn-light btn-lg" href="/recommendation" role="button">Get Started</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;