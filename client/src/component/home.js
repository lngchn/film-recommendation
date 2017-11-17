import React, { Component } from 'react';
import './home.css';

import TutorialSlide1 from '../img/tutorial_slide01.png';
import TutorialSlide2 from '../img/tutorial_slide02.png';
import TutorialSlide3 from '../img/tutorial_slide03.png';

class Home extends Component {
  render() {
    return(
      <div>
        <div className="jumbotron jumbotron-fluid m-0" id="home-background">
          <div className="container text-light text-center" id="home-content">
            <h1 className="display-3 text-uppercase text-center">Welcome to Film Pro!</h1>
            <p className="lead text-center">Film Pro is the perfect guide for your adventures in movie watching.<br />If you're feeling adventurous, click below to begin your journey into cinema!</p>
            <p className="lead">
              <a className="btn btn-light btn-lg mr-2" href="/register" role="button">Sign Up</a>
              <a className="btn btn-light btn-lg ml-2" href="#carouselTutorialIndicators" role="button">Tutorial</a>
            </p>
          </div>
        </div>

        <div id="carouselTutorialIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselTutorialIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselTutorialIndicators" data-slide-to="1"></li>
            <li data-target="#carouselTutorialIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block img-fluid" src={TutorialSlide1} alt="First slide" />
              <div className="carousel-caption d-none d-block">
                <p>Rate films</p>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block img-fluid" src={TutorialSlide2} alt="Second slide" />
              <div className="carousel-caption d-none d-block">
                <p className="text-dark">Add as seed</p>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block img-fluid" src={TutorialSlide3} alt="Third slide" />
              <div className="carousel-caption d-none d-block">
                <p>Get recommendations</p>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselTutorialIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselTutorialIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

      </div>
    );
  }
}

export default Home;
