import React from 'react';
import ReactStars from 'react-stars';
import './recommendation.css';

import ShuffleArray from '../helperFunctions/shuffleArray';
  
function SideBarFilter(props) {
  // Use disabled for the input, readonly has bug.
  return(
      <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar text-left pt-3 border border-dark border-top-0 border-bottom-0 border-left-0">
        <nav className="nav flex-column filter-link">
          <div className="checkbox">
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Action", event)}><input type="checkbox" value="Action" className="filterCheckbox" disabled/> Action</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Adventure", event)}><input type="checkbox" value="Adventure" className="filterCheckbox" disabled/> Adventure</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Animation", event)}><input type="checkbox" value="Animation" className="filterCheckbox" disabled/> Animation</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Comedy", event)}><input type="checkbox" value="Comedy" className="filterCheckbox" disabled/> Comedy</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Crime", event)}><input type="checkbox" value="Crime" className="filterCheckbox" disabled/> Crime</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Drama", event)}><input type="checkbox" value="Drama" className="filterCheckbox" disabled/> Drama</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Fantasy", event)}><input type="checkbox" value="Fantasy" className="filterCheckbox" disabled/> Fantasy</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Horror", event)}><input type="checkbox" value="Horror" className="filterCheckbox" disabled/> Horror</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Mystery", event)}><input type="checkbox" value="Mystery" className="filterCheckbox" disabled/> Mystery</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Romance", event)}><input type="checkbox" value="Romance" className="filterCheckbox" disabled/> Romance</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Science Fiction", event)}><input type="checkbox" value="Science Fiction" className="filterCheckbox" disabled/> Sci-Fi</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onFilterChange("Thriller", event)}><input type="checkbox" value="Thriller" className="filterCheckbox" disabled/> Thriller</a>
            <a className="nav-item nav-link text-right" href="#" data-toggle="modal" data-target="#sidebarFilterModal">More</a>
            <button type="button" className="btn btn-secondary" onClick={() => props.onFilterReset()}>Reset Filters</button>
          </div>

          <div className="modal fade" id="sidebarFilterModal" tabIndex="-1" role="dialog" aria-labelledby="sidebarFilterModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onFilterChange("Documentary", event)}><input type="checkbox" value="Documentary" className="filterCheckbox" disabled/> Documentary</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onFilterChange("Family", event)}><input type="checkbox" value="Family" className="filterCheckbox" disabled/> Family</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onFilterChange("History", event)}><input type="checkbox" value="History" className="filterCheckbox" disabled/> History</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onFilterChange("Music", event)}><input type="checkbox" value="Music" className="filterCheckbox" disabled/> Music</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onFilterChange("War", event)}><input type="checkbox" value="War" className="filterCheckbox" disabled/> War</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onFilterChange("Western", event)}><input type="checkbox" value="Western" className="filterCheckbox" disabled/> Western</a>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

        </nav>
      </nav>

  );
}

function SearchResultFilm(props) {
  const id = props.data.id;
  const title = props.data.title;
  const imageUrl = `https://image.tmdb.org/t/p/w45/${props.data.poster_path}`;
  const image = imageUrl.includes("null") ? <i className="fa fa-file-image-o fa-4x" aria-hidden="true"></i> : <img src={imageUrl} alt="Movie Poster" /> 
  
  return(
    <div className="list-group" id="list-rated-films">
      <a href="#" onClick={(event) => props.onSeedAdd(id, event)} className="list-group-item list-group-item-action flex-column align-items-start">
        <span className="col-2">
          {image}
        </span>
        <span className="col-2">
          {title}
        </span>
      </a>
    </div>
  );
}

function SeedFilm(props) {
  const title = props.data.title;
  const imageUrl = `https://image.tmdb.org/t/p/w185/${props.data.poster_path}`;
  const detailsUrl = '/movie/' + props.data.id;
  return(
    <div className="col-6 col-md-3 mt-4 thumbnail text-center">
      <a href={detailsUrl} className="movie-detail-link">
        <img src={imageUrl} className="img-fluid movie-poster" alt="Movie Poster" />
        <h4 className="movie-title">{title}</h4>
      </a>
      <a href="#" onClick={(event) => props.onSeedDelete(props.data.id, event)}>
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
  const detailsUrl = '/movie/' + props.data.id;
  return(
    <div className="col-6 col-md-3 mt-4 thumbnail text-center">
      <a href={detailsUrl} className="movie-detail-link">
        <img src={imageUrl} className="img-fluid movie-poster" alt="Movie Poster" />
        <h4 className="movie-title">{title}</h4>
      </a>
    </div>
  );  
}

class Recommendation extends React.Component {
  constructor() {
    super();
    this.state = {
      seedFilms: [],
      recommendation: [],
      recommendationSubset: [],
      userSelectedGenres: [],
      itemBasedSearchTimeout: 0,
      itemBasedSearchValue: '',
      itemBasedSearchResults: [],
    };
    this.handleSeedDelete = this.handleSeedDelete.bind(this);
    this.handleSeedAdd = this.handleSeedAdd.bind(this);
    this.fetchFilms = this.fetchFilms.bind(this);
    this.updateRecommendation = this.updateRecommendation.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleFilterReset = this.handleFilterReset.bind(this);
    this.itemBasedSearch = this.itemBasedSearch.bind(this);
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
      const seedFilms = user.seedFilms;
      const recommendation = ShuffleArray(user.recommendation);
      const recommendationSubset = recommendation;
      const userSelectedGenres = [];

      this.setState({
        seedFilms,
        recommendation,
        recommendationSubset,
        userSelectedGenres
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  handleSeedAdd(id, event) {
    event.preventDefault();
    fetch("/user/seedfilm", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        id: id
      })
    })
    .then(res => {

    })
    .catch(err => {
      console.log(err.message);
    });
  }
  
  handleSeedDelete(id, event) {
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
      })
    })
    .then(res => {
      this.fetchFilms();
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  updateRecommendation() {
    // Ideally, item based algorithm should be scheduled in the back-end
    fetch("/recommendation/itembased", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin"
    })
    .then(res => {
      // Heroku has a 30 seconds limit on request waiting. 
      // If request waits for more than 30 seconds, it will timeout.
      // Need to implement Socket.IO to get around this.
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
    this.updateRecommendation();
    this.fetchFilms();
    document.getElementById("addSeedFilmNav").style.display = "none";
  }
  
  handleFilterChange(value, e) {
    e.preventDefault();

    let checked = false;
    let checkboxes = document.getElementsByClassName("filterCheckbox");

    // Check or uncheck checkbox
    for(let i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].defaultValue === value) {
        checked = !checkboxes[i].checked
        checkboxes[i].checked = !checkboxes[i].checked;

        checked === true ? checkboxes[i].parentElement.style.color = "#72d147"
                         : checkboxes[i].parentElement.style.color = "white";

        break;
      }
    }    

    const recommendation = this.state.recommendation;
    let userSelectedGenres = this.state.userSelectedGenres;
    let recommendationSubset = [];
   
    if(checked) {
      userSelectedGenres.push(value);
    }
    else {
      // Add to user genre selections
      for(let i = 0; i < userSelectedGenres.length; i++) {
        if(userSelectedGenres[i] === value) {
          userSelectedGenres.splice(i, 1);
        } 
      }  
    }  
    
    recommendation.forEach(film => {
      //Execute this if there is at least one genre filter selected
      if(typeof userSelectedGenres !== 'undefined' && userSelectedGenres.length > 0) { 
        film.genres.forEach(genre => {
          if(userSelectedGenres.includes(genre.name) && !recommendationSubset.includes(film)) {
            recommendationSubset.push(film);
          }   
        });
       // Else, clear genre selections
      } else { 
        recommendationSubset.push(film);
      } 
    });
              
    this.setState({
      recommendationSubset: recommendationSubset,
      userSelectedGenres: userSelectedGenres
    });
  }
  
  handleFilterReset() {
    // Uncheck all filter checkboxes
    let checkboxes = document.getElementsByClassName("filterCheckbox");
    for(let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      checkboxes[i].parentElement.style.color = "white";
    }

    const recommendationSubset = this.state.recommendation;
    const userSelectedGenres = [];
    
    this.setState({
      recommendationSubset: recommendationSubset,
      userSelectedGenres: userSelectedGenres
    });
  }

  itemBasedSearch(event) {
    this.setState({
      itemBasedSearchValue: event.target.value
    });

    if(this.state.itemBasedSearchTimeout) {
      clearTimeout(this.state.itemBasedSearchTimeout);
    }

    this.setState({
      itemBasedSearchTimeout: setTimeout(() => {
        fetch("/search", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: this.state.itemBasedSearchValue
          })
        })
        .then(res => res.json())
        .then(json => {
          this.setState({
            itemBasedSearchResults: json.results,
          });
        })
        .catch(err => {
          this.setState({
            itemBasedSearchResults: []
          })
        });
      }, 1000)
    });
  }
  
  render() {
    let seedFilms = this.state.seedFilms.map(movie => <SeedFilm data={movie} key={movie.id} onSeedDelete={this.handleSeedDelete} />);
    let recommendationSubset = this.state.recommendationSubset.map(movie => <RecommendationFilm data={movie} key={movie.id} />);
    let itemBasedSearchResults = this.state.itemBasedSearchResults.map(movie => <SearchResultFilm data={movie} key={movie.id} onSeedAdd={this.handleSeedAdd} />);

    return(
      <div className="container-fluid">
        <div className="row">
          <SideBarFilter onFilterChange={this.handleFilterChange} onFilterReset={this.handleFilterReset} />
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
                {seedFilms}
              </section>
            </div>
            <hr id="recommendation-hr" />
            {/* Recommendations */}
            <div>
              <h2 className="text-left mt-5">Recommendations</h2>
              <section className="row text-center placeholders">
                {recommendationSubset}
              </section>
            </div>
          </main>

          <div id="addSeedFilmNav">
            <a href="#" className="closebtn" onClick={this.closeNav}>&times;</a>

            <div id='test' className="row">
              <input className="col-12" id="test-input" type="text" value={this.state.itemBasedSearchValue} onChange={this.itemBasedSearch} placeholder="Search" aria-label="Search" />
            </div>
            <div className="row" id="overlay-main">
              <div className="col-6" id="overlay-content">
                {itemBasedSearchResults}
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default Recommendation;
