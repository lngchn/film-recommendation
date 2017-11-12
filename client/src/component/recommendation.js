import React from 'react';
import ReactStars from 'react-stars';

import './recommendation.css';

function SideBarFilter(props) {
  return(
    <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar text-left pt-3 border border-dark border-top-0 border-bottom-0 border-left-0">
      <h4 className="ml-3 mb-1 text-light text-uppercase">Genre</h4>
      <nav className="nav flex-column filter-link">
        <a className="nav-item nav-link" href="#">Action</a>
        <a className="nav-item nav-link" href="#">Adventure</a>
        <a className="nav-item nav-link" href="#">Animation</a>
        <a className="nav-item nav-link" href="#">Comedy</a>
        <a className="nav-item nav-link" href="#">Documentary</a>
        <a className="nav-item nav-link" href="#">Drama</a>
        <a className="nav-item nav-link" href="#">Horror</a>
        <a className="nav-item nav-link" href="#">Sci-Fi</a>
        <a className="nav-item nav-link" href="#">Fantasy</a>
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

function RatedFilm(props) {
  const id = props.data.id;
  const imdb_id = props.data.imdb_id;
  const rating = props.data.rating;
  const title = props.data.title;
  const imageUrl = `https://image.tmdb.org/t/p/w45/${props.data.poster_path}`;
  const image = imageUrl.includes("null") ? <i className="fa fa-file-image-o fa-4x" aria-hidden="true"></i> : <img src={imageUrl} alt="Movie Poster" /> 
  
  return(
    <div className="list-group" id="list-rated-films">
      <a href="#" onClick={(event) => props.onSeedAdd(id, imdb_id, event)} className="list-group-item list-group-item-action flex-column align-items-start">
        <span className="col-2">
          {image}
        </span>
        <span className="col-2">
          {title}
        </span>
        <ReactStars className="uneditableStars"
            count={10}
            half={false}
            size={24}
            color2={'#ffd700'} 
            edit={false}
            value={rating} />
      </a>
    </div>
  );
}

function SeedFilm(props) {
  const title = props.data.title;
  const imageUrl = `https://image.tmdb.org/t/p/w185/${props.data.poster_path}`;
  return(
    <div className="col-6 col-md-3 mt-4 thumbnail text-center">
      <img src={imageUrl} className="img-fluid movie-poster" alt="Movie Poster" />
      <h4 className="movie-title">{title}</h4>
      <a href="#" onClick={(event) => props.onSeedDelete(props.data.id, props.data.imdb_id, event)}>
        <button type="button" className="btn btn-outline-danger remove-button">
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>
      </a>
    </div>
  );
}

function RecommendationFilm(props) {
  const title = props.data.title;
  const imageUrl = `https://image.tmdb.org/t/p/w185/${props.data.poster_path}`;
  return(
    <div className="col-6 col-md-3 mt-4 thumbnail text-center">
      <img src={imageUrl} className="img-fluid movie-poster" alt="Movie Poster" />
      <h4 className="movie-title">{title}</h4>
    </div>
  );  
}

class Recommendation extends React.Component {
  constructor() {
    super();
    this.state = {
      ratedFilms: [],
      seedFilms: [],
      recommendation: []
    };
    this.handleSeedDelete = this.handleSeedDelete.bind(this);
    this.handleSeedAdd = this.handleSeedAdd.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  componentDidMount() {
    this.fetchFilms();
  }

  fetchFilms() {
    fetch("/user/films", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin"
    })
    .then(res => res.json())
    .then(user => {
      let ratedFilms = user.ratedFilms.sort((filmA, filmB) => filmA.title < filmB.title ? -1 : 1);
      ratedFilms = ratedFilms.map(movie => <RatedFilm data={movie} key={movie.id} onSeedAdd={this.handleSeedAdd} />);
      const seedFilms = user.seedFilms.map(movie => <SeedFilm data={movie} key={movie.id} onSeedDelete={this.handleSeedDelete} />);
      const recommendation = user.recommendation.map(movie => <RecommendationFilm data={movie} key={movie.id} />);

      this.setState({
        ratedFilms,
        seedFilms,
        recommendation,
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  handleSeedAdd(id, imdb_id, event) {
    event.preventDefault();
    fetch("/user/seedfilm", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        id: id,
        imdb_id: imdb_id
      })
    })
    .then(res => {

    })
    .catch(err => {
      console.log(err.message);
    });
  }

  handleSeedDelete(id, imdb_id, event) {
    event.preventDefault();
    fetch("/user/seedfilm", {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        id: id,
        imdb_id: imdb_id
      })
    })
    .then(res => {
      this.fetchFilms();
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  openNav() {
    this.fetchFilms();
    document.getElementById("addSeedFilmNav").style.display = "block";
  }

  closeNav() {
    this.fetchFilms();
    document.getElementById("addSeedFilmNav").style.display = "none";
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="row">
          <SideBarFilter />

          {/* Body */}
          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pb-5 text-light recommendation">
            {/* Seed Films */}
            <div>
              <h2 className="text-left mt-3">Seed Films
                <button type="button" className="btn btn-outline-info ml-2" onClick={this.openNav}>
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </h2>
              <section className="row">
                {this.state.seedFilms}
              </section>
            </div>
            <hr />
            {/* Recommendations */}
            <div>
              <h2 className="text-left mt-5">Recommendations</h2>
              <section className="row text-center placeholders">
                {this.state.recommendation}
              </section>
            </div>
          </main>

          <div id="addSeedFilmNav">
            <a href="#" className="closebtn" onClick={this.closeNav}>&times;</a>
              <div className="row" id="overlay-main">
                <div className="col-6" id="overlay-content">
                  {this.state.ratedFilms}
                </div>
              </div>
          </div>

          {/* Modal for Add a Seed Film Button */}
          {/*<div className="modal fade" id="addSeedFilm" tabIndex="-1" role="dialog" aria-labelledby="addSeedFilmLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addSeedFilmLabel">Add Seed Films</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.ratedFilms}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>*/}

        </div>
      </div>
    );
  }
}

export default Recommendation;
