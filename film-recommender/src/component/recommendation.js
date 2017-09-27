import React from 'react';
import './recommendation.css';
import movie01 from '../img/01.jpg';

class Recommendation extends React.Component {
  render() {
    return(
      <div className="container-fluid">
        <div className="row">

          <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar text-left pt-3 border border-dark border-top-0 border-bottom-0 border-left-0">
            <h4 className="ml-3 mb-1 text-light text-uppercase">Genre</h4>
            <nav className="nav flex-column">
              <a className="nav-item nav-link" href="#">Action & Adventure</a>
              <a className="nav-item nav-link" href="#">Animation & Anime</a>
              <a className="nav-item nav-link" href="#">Children's & Family</a>
              <a className="nav-item nav-link" href="#">Comedy</a>
              <a className="nav-item nav-link" href="#">Documentary</a>
              <a className="nav-item nav-link" href="#">Drama</a>
              <a className="nav-item nav-link" href="#">Horror</a>
              <a className="nav-item nav-link" href="#">Sci-Fi & Fantasy</a>
            </nav>
            <h4 className="mt-4 ml-3 mb-1 text-light text-uppercase">Rating</h4>
            <nav className="nav flex-column">
              <a className="nav-item nav-link" href="#">G</a>
              <a className="nav-item nav-link" href="#">PG</a>
              <a className="nav-item nav-link" href="#">PG-13</a>
              <a className="nav-item nav-link" href="#">R</a>
              <a className="nav-item nav-link" href="#">NR</a>
              <a className="nav-item nav-link" href="#">NC-17</a>
            </nav>
          </nav>

          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 text-light">
            <h2 className="text-left mt-3">Seed Films</h2>
            <section className="row text-center placeholders">
              <div className="col-6 col-sm-3 placeholder">
                <img src={movie01} width="202" height="300" className="img-fluid" alt="Generic placeholder thumbnail" />
                <h4>Movie Title</h4>
              </div>
              <div className="col-6 col-sm-3 placeholder">
                <img src={movie01} width="202" height="300" className="img-fluid" alt="Generic placeholder thumbnail" />
                <h4>Movie Title</h4>
              </div>
              <div className="col-6 col-sm-3 placeholder">
                <img src={movie01} width="202" height="300" className="img-fluid" alt="Generic placeholder thumbnail" />
                <h4>Movie Title</h4>
              </div>
              <div className="col-6 col-sm-3 placeholder">
                <img src={movie01} width="202" height="300" className="img-fluid" alt="Generic placeholder thumbnail" />
                <h4>Movie Title</h4>
              </div>
            </section>

            <h2 className="text-left mt-5">Recommendations</h2>
            <section className="row text-center placeholders">
              <div className="col-6 col-sm-3 placeholder">
                <img src={movie01} width="202" height="300" className="img-fluid" alt="Generic placeholder thumbnail" />
                <h4>Movie Title</h4>
              </div>
              <div className="col-6 col-sm-3 placeholder">
                <img src={movie01} width="202" height="300" className="img-fluid" alt="Generic placeholder thumbnail" />
                <h4>Movie Title</h4>
              </div>
              <div className="col-6 col-sm-3 placeholder">
                <img src={movie01} width="202" height="300" className="img-fluid" alt="Generic placeholder thumbnail" />
                <h4>Movie Title</h4>
              </div>
              <div className="col-6 col-sm-3 placeholder">
                <img src={movie01} width="202" height="300" className="img-fluid" alt="Generic placeholder thumbnail" />
                <h4>Movie Title</h4>
              </div>
            </section>
          </main>

        </div>
      </div>
    );
  }
}

export default Recommendation;