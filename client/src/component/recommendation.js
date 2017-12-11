import React from 'react';
import './recommendation.css';
  
function SideBarFilter(props) {
  // Use disabled for the input, readonly has bug.
  return(
    <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar text-left pt-3 border border-dark border-top-0 border-bottom-0 border-left-0">
      <nav className="nav flex-column filter-link">
        <div>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Action" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Action</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Adventure" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Adventure</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Animation" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Animation</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Comedy" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Comedy</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Crime" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Crime</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Drama" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Drama</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Fantasy" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Fantasy</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Horror" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Horror</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Mystery" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Mystery</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Romance" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Romance</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Science Fiction" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Science Fiction</span>
          </label>
          <label className="col custom-control custom-checkbox text-light filterLabel">
            <input type="checkbox" className="custom-control-input filterCheckbox" value="Thriller" onClick={props.onGenreChange} />
            <span className="custom-control-indicator"></span>
            <span className="custom-control-description">Thriller</span>
          </label>

          <a className="col nav-item nav-link text-right" href="#" data-toggle="modal" data-target="#sidebarFilterModal">More</a>
          
        	<label className="text-light">Release Year</label>
        	<div className="input-group mb-3">
        		<input className="form-control mr-1" id="min_year_input" value={props.releaseYearMin} placeholder="Min" type="text" maxLength="4" autoComplete="off" onChange={event => props.onReleaseYearMinChange(event)} />
        		<input className="form-control" id="max_year_input" value={props.releaseYearMax} placeholder="Max" type="text" maxLength="4" autoComplete="off" onChange={event => props.onReleaseYearMaxChange(event)} />
        	</div>

       		<label className="text-light">Runtime</label>
        	<div className="input-group mb-5">
        		<select className="form-control" id="runtime-selector" value={props.selectedRuntime} onChange={event => props.onRuntimeFilterChange(event)}>
        			<option value=""></option>
        			<option value="1hr_or_less">1 hr or less</option>
        			<option value="1_to_2_hrs">1 to 2 hrs</option>
        			<option value="2hrs_or_more">2 hrs or more</option>
      			</select>
      		</div>
          
          <button type="button" className="btn btn-secondary" onClick={() => props.onFilterReset()}>Reset Filters</button>
        </div>

        <div className="modal fade" id="sidebarFilterModal" tabIndex="-1" role="dialog" aria-labelledby="sidebarFilterModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <label className="col custom-control custom-checkbox text-dark filterLabel">
                  <input type="checkbox" className="custom-control-input filterCheckbox" value="Documentary" onClick={props.onGenreChange} />
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">Documentary</span>
                </label>
                <label className="col custom-control custom-checkbox text-dark filterLabel">
                  <input type="checkbox" className="custom-control-input filterCheckbox" value="Family" onClick={props.onGenreChange} />
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">Family</span>
                </label>
                <label className="col custom-control custom-checkbox text-dark filterLabel">
                  <input type="checkbox" className="custom-control-input filterCheckbox" value="History" onClick={props.onGenreChange} />
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">History</span>
                </label>
                <label className="col custom-control custom-checkbox text-dark filterLabel">
                  <input type="checkbox" className="custom-control-input filterCheckbox" value="Music" onClick={props.onGenreChange} />
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">Music</span>
                </label>
                <label className="col custom-control custom-checkbox text-dark filterLabel">
                  <input type="checkbox" className="custom-control-input filterCheckbox" value="War" onClick={props.onGenreChange} />
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">War</span>
                </label>
                <label className="col custom-control custom-checkbox text-dark filterLabel">
                  <input type="checkbox" className="custom-control-input filterCheckbox" value="Western" onClick={props.onGenreChange} />
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">Western</span>
                </label>
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
      selectedGenres: [],
      releaseYearMin: '',
      releaseYearMax: '',
      selectedRuntime: '',
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
    this.itemBasedSearch = this.itemBasedSearch.bind(this);
    this.handleReleaseYearMinChange = this.handleReleaseYearMinChange.bind(this);
    this.handleReleaseYearMaxChange = this.handleReleaseYearMaxChange.bind(this);
    this.handleRuntimeFilterChange = this.handleRuntimeFilterChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.handleFilterReset = this.handleFilterReset.bind(this);
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
      const recommendation = user.recommendation;
      const recommendationSubset = recommendation;

      this.setState({
        seedFilms,
        recommendation,
        recommendationSubset,
        selectedGenres: [],
        releaseYearMin: '',
        releaseYearMax: '',
        selectedRuntime: '',
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

  handleReleaseYearMinChange(event) {
    this.setState({ releaseYearMin: event.target.value });
    setTimeout(() => {
      this.applyFilters();
    }, 1000)
  }

  handleReleaseYearMaxChange(event) {
    this.setState({ releaseYearMax: event.target.value });
    setTimeout(() => {
      this.applyFilters();
    }, 1000)
  }

  handleRuntimeFilterChange(event) {
    this.setState({ selectedRuntime: event.target.value });
    setTimeout(() => {
      this.applyFilters();
    }, 1000)
  }

  handleGenreChange(event) {
    let genre = event.target.value;
    let selectedGenres = this.state.selectedGenres;
    let genreIndex = selectedGenres.indexOf(genre);

    if(event.target.checked && genreIndex === -1) {
      selectedGenres.push(genre);
    } else if(!event.target.checked && genreIndex > -1) {
      selectedGenres.splice(genreIndex, 1);
    }

    this.setState({ selectedGenres });

    this.applyFilters();
  }
  
  applyFilters() {
    let recommendation = this.state.recommendation;
    let recommendationSubset = [];
    let selectedGenres = this.state.selectedGenres;
    let releaseYearMin = this.state.releaseYearMin;
    let releaseYearMax = this.state.releaseYearMax;
    let selectedRuntime = this.state.selectedRuntime;

    if(selectedGenres.length > 0) {
      recommendation.forEach(film => {
        let genres = film.genres;

        for(let i in genres) {
          if(selectedGenres.includes(genres[i].name)) {
            recommendationSubset.push(film);
            break;
          }
        }
      });
    } else {
      recommendationSubset = recommendation;
    }

    if(releaseYearMin.length === 4 && releaseYearMax.length === 4) {
      recommendationSubset = recommendationSubset.filter(film => {
        let releaseYear = film.release_date.substr(0, 4);
        return parseInt(releaseYearMin, 10) <= parseInt(releaseYear, 10) && 
               parseInt(releaseYear, 10) <= parseInt(releaseYearMax, 10);
      });
    } else if(releaseYearMin.length === 4) {
      recommendationSubset = recommendationSubset.filter(film => {
        let releaseYear = film.release_date.substr(0, 4);
        return parseInt(releaseYearMin, 10) <= parseInt(releaseYear, 10);
      });
    } else if(releaseYearMax.length === 4) {
      recommendationSubset = recommendationSubset.filter(film => {
        let releaseYear = film.release_date.substr(0, 4);
        return parseInt(releaseYear, 10) <= parseInt(releaseYearMax, 10);
      });
    }

    if(selectedRuntime.length > 0) {
      recommendationSubset = recommendationSubset.filter(film => {
        let runtime = film.runtime;
        if(selectedRuntime === "1hr_or_less") {
          return runtime <= 60;
        } else if(selectedRuntime === "1_to_2_hrs") {
          return runtime >= 60 && runtime <= 120;
        } else {
          return runtime >= 120;
        }
      });
    }

    this.setState({ recommendationSubset });
  }

  handleFilterReset() {
    let recommendationSubset = this.state.recommendation;

    // Uncheck all genre filter checkboxes
    let checkboxes = document.getElementsByClassName("filterCheckbox");
    for(let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }

    this.setState({
      recommendationSubset,
      selectedGenres: [],
      releaseYearMin: '',
      releaseYearMax: '',
      selectedRuntime: '',
    });
  }

  render() {
    let seedFilms = this.state.seedFilms.map(movie => <SeedFilm data={movie} key={movie.id} onSeedDelete={this.handleSeedDelete} />);
    let recommendationSubset = this.state.recommendationSubset.map(movie => <RecommendationFilm data={movie} key={movie.id} />);
    let itemBasedSearchResults = this.state.itemBasedSearchResults.map(movie => <SearchResultFilm data={movie} key={movie.id} onSeedAdd={this.handleSeedAdd} />);

    return(
      <div className="container-fluid">
        <div className="row">
          <SideBarFilter onGenreChange={this.handleGenreChange} onFilterReset={this.handleFilterReset} 
                         onReleaseYearMinChange={this.handleReleaseYearMinChange} releaseYearMin={this.state.releaseYearMin}
                         onReleaseYearMaxChange={this.handleReleaseYearMaxChange} releaseYearMax={this.state.releaseYearMax}
                         onRuntimeFilterChange={this.handleRuntimeFilterChange} selectedRuntime={this.state.selectedRuntime}
          />                    
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
            <div id='itemBasedSearchBar' className="row">
              <input className="col-12" type="text" value={this.state.itemBasedSearchValue} onChange={this.itemBasedSearch} placeholder="Search" aria-label="Search" />
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
