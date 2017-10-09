import React from 'react';
import './recommendation.css';
import movie01 from '../img/01.jpg';

function SideBarFilter(props) {
  return(
    <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar text-left pt-3 border border-dark border-top-0 border-bottom-0 border-left-0">
      <h4 className="ml-3 mb-1 text-light text-uppercase">Genre</h4>
      <nav className="nav flex-column filter-link">
        <a className="nav-item nav-link" href="#">Action & Adventure</a>
        <a className="nav-item nav-link" href="#">Animation & Anime</a>
        <a className="nav-item nav-link" href="#">Children's & Family</a>
        <a className="nav-item nav-link" href="#">Comedy</a>
        <a className="nav-item nav-link" href="#">Documentary</a>
        <a className="nav-item nav-link" href="#">Drama</a>
        <a className="nav-item nav-link" href="#">Horror</a>
        <a className="nav-item nav-link" href="#">Sci-Fi & Fantasy</a>
        <a className="nav-item nav-link text-right" href="#">More</a>
      </nav>
      <h4 className="mt-4 ml-3 mb-1 text-light text-uppercase">Rating</h4>
      <nav className="nav flex-column filter-link">
        <a className="nav-item nav-link" href="#">G</a>
        <a className="nav-item nav-link" href="#">PG</a>
        <a className="nav-item nav-link" href="#">PG-13</a>
        <a className="nav-item nav-link" href="#">R</a>
        <a className="nav-item nav-link" href="#">NR</a>
        <a className="nav-item nav-link" href="#">NC-17</a>
        <a className="nav-item nav-link text-right" href="#">More</a>
      </nav>
    </nav>
  );
}

function MovieImage(props) {
  return(
    <div className="col-6 col-md-3 thumbnail text-center">
      <img src={movie01} width="202" height="300" className="img-fluid movie-poster" alt="Movie Poster" />
      <h4 className="movie-title">The Martian</h4>
      <button type="button" className="btn btn-outline-danger remove-button">
        <i className="fa fa-minus" aria-hidden="true"></i>
      </button>
    </div>
  );
}

class Recommendation extends React.Component {
  constructor() {
    super();
    this.state = {
      seedMovies: [],
      recommendationMovies: []
    }  
  }

  componentDidMount() {
    // Movie data is to be fetched here, and then seedMovies and recommendationMovies would
    // map over the json instead of temp. 
    const temp = [1, 2, 3, 4];
    const seedMovies = temp.map(movie => <MovieImage data={movie} key={movie} />);
    const recommendationMovies = temp.map(movie => <MovieImage data={movie} key={movie} />);

    this.setState({
      seedMovies,
      recommendationMovies
    });
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="row">
          <SideBarFilter />

          {/* Body */}
          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pb-5 text-light recommendation">
            {/* Seed Films */}
            <h2 className="text-left mt-3">Seed Films
              <button type="button" className="btn btn-outline-info ml-2" data-toggle="modal" data-target="#addSeedFilm" >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </h2>
            <section className="row">
              {this.state.seedMovies}
            </section>
            {/* Recommendations */}
            <h2 className="text-left mt-5">Recommendations</h2>
            <section className="row text-center placeholders">
              {this.state.recommendationMovies}
            </section>
          </main>

          {/* Modal for Add a Seed Film Button */}
          <div className="modal fade" id="addSeedFilm" tabIndex="-1" role="dialog" aria-labelledby="addSeedFilmLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addSeedFilmLabel">Add a Seed Film</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Testing
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-outline-success seedFilmAddButton">Add</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Recommendation;