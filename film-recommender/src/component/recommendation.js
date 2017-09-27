import React from 'react';
import './recommendation.css';

class Recommendation extends React.Component {
  render() {
    return(
      <div className="row no-gutters">
        <nav className="nav flex-column col-2 text-left border border-secondary border-top-0 border-bottom-0 border-left-0">
          <h3 className="ml-3 mt-3 mb-2 text-light text-uppercase">Genre</h3>
          <a className="nav-link pt-0 pb-0" href="#">Action & Adventure</a>
          <a className="nav-link pt-0 pb-0" href="#">Animation & Anime</a>
          <a className="nav-link pt-0 pb-0" href="#">Children's & Family</a>
          <a className="nav-link pt-0 pb-0" href="#">Comedy</a>
          <a className="nav-link pt-0 pb-0" href="#">Documentary</a>
          <a className="nav-link pt-0 pb-0" href="#">Drama</a>
          <a className="nav-link pt-0 pb-0" href="#">Horror</a>
          <a className="nav-link pt-0 pb-0" href="#">Sci-Fi & Fantasy</a>
          <a className="nav-link pt-0 pb-0 text-info text-right" href="#" data-toggle="modal" data-target="#moreGenre">More</a>
        </nav>

        <div className="col-10">
          <div className="jumbotron jumbotron-fluid text-light m-0 pt-3">
            <div className="container-fluid">
              <h1 className="display-5 text-left">Seed Films</h1>
            </div>
          </div>
          <div className="jumbotron jumbotron-fluid text-light m-0 pt-3">
            <div className="container-fluid">
              <h1 className="display-5 text-left">Recommendations</h1>
            </div>
          </div>
        </div>

        <div className="modal fade" id="moreGenre" tabIndex="-1" role="dialog" aria-labelledby="moreGenreLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="moreGenreLabel">Filter</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                more filters here
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recommendation;