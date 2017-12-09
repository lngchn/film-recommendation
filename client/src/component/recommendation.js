import React from 'react';
import './recommendation.css';
  
function SideBarFilter(props) {
  // Use disabled for the input, readonly has bug.
  return(
      <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar text-left pt-3 border border-dark border-top-0 border-bottom-0 border-left-0">
        <nav className="nav flex-column filter-link">
          <div className="checkbox">
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Action", event)}><input type="checkbox" value="Action" className="filterCheckbox" disabled/> Action</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Adventure", event)}><input type="checkbox" value="Adventure" className="filterCheckbox" disabled/> Adventure</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Animation", event)}><input type="checkbox" value="Animation" className="filterCheckbox" disabled/> Animation</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Comedy", event)}><input type="checkbox" value="Comedy" className="filterCheckbox" disabled/> Comedy</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Crime", event)}><input type="checkbox" value="Crime" className="filterCheckbox" disabled/> Crime</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Drama", event)}><input type="checkbox" value="Drama" className="filterCheckbox" disabled/> Drama</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Fantasy", event)}><input type="checkbox" value="Fantasy" className="filterCheckbox" disabled/> Fantasy</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Horror", event)}><input type="checkbox" value="Horror" className="filterCheckbox" disabled/> Horror</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Mystery", event)}><input type="checkbox" value="Mystery" className="filterCheckbox" disabled/> Mystery</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Romance", event)}><input type="checkbox" value="Romance" className="filterCheckbox" disabled/> Romance</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Science Fiction", event)}><input type="checkbox" value="Science Fiction" className="filterCheckbox" disabled/> Sci-Fi</a>
            <a className="nav-link nav-item mb-1" href="#" onClick={(event) => props.onGenreFilter("Thriller", event)}><input type="checkbox" value="Thriller" className="filterCheckbox" disabled/> Thriller</a>
            <a className="nav-item nav-link text-right" href="#" data-toggle="modal" data-target="#sidebarFilterModal">More</a>
            
        	<label className="filter-labels">Release Year:</label>
        	<div className="input-group">
        		<input className="form-control" id="min_year_input" placeholder="Min" type="text" autoComplete="off"  onChange={props.onReleaseYearMin}  />
        		<input className="form-control" id="max_year_input" placeholder="Max" type="text" autoComplete="off"  onChange={props.onReleaseYearMax} />
        		<button type="button" className="btn btn-secondary" onClick={() => props.onReleaseYearFilter()}>Find</button>
        	</div>
        	<br />
       		<label className="filter-labels">Runtime:</label>
        	<div className="input-group">
        		<select className="form-control" id="runtime-selector" onChange={props.onRuntimeSelection}>
        			<option value="reset"></option>
        			<option value="1hr_or_less">1 hr or less </option>
        			<option value="1_to_2_hrs">1 to 2 hrs</option>
        			<option value="2hrs_or_more">2 hrs or more </option>
      			</select>
      		    <button type="button" className="btn btn-secondary" onClick={() => props.onRuntimeFilter()}>Find</button>
      		</div>
        	<br />
            <button type="button" className="btn btn-secondary" onClick={() => props.onFilterReset()}>Reset Filters</button>
          </div>

          <div className="modal fade" id="sidebarFilterModal" tabIndex="-1" role="dialog" aria-labelledby="sidebarFilterModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onGenreFilter("Documentary", event)}><input type="checkbox" value="Documentary" className="filterCheckbox" disabled/> Documentary</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onGenreFilter("Family", event)}><input type="checkbox" value="Family" className="filterCheckbox" disabled/> Family</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onGenreFilter("History", event)}><input type="checkbox" value="History" className="filterCheckbox" disabled/> History</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onGenreFilter("Music", event)}><input type="checkbox" value="Music" className="filterCheckbox" disabled/> Music</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onGenreFilter("War", event)}><input type="checkbox" value="War" className="filterCheckbox" disabled/> War</a>
                  <a className="nav-link nav-item mb-1 text-dark" href="#" onClick={(event) => props.onGenreFilter("Western", event)}><input type="checkbox" value="Western" className="filterCheckbox" disabled/> Western</a>
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
      releaseYearMax: null,
      releaseYearMin: null,
      runtimeSelection:null
    };
    this.handleSeedDelete = this.handleSeedDelete.bind(this);
    this.handleSeedAdd = this.handleSeedAdd.bind(this);
    this.fetchFilms = this.fetchFilms.bind(this);
    this.updateRecommendation = this.updateRecommendation.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.handleGenreFilter = this.handleGenreFilter.bind(this)
    this.handleFilterReset = this.handleFilterReset.bind(this);
    this.itemBasedSearch = this.itemBasedSearch.bind(this);
    this.handleReleaseYearMin = this.handleReleaseYearMin.bind(this);
    this.handleReleaseYearMax = this.handleReleaseYearMax.bind(this);
    this.handleReleaseYearFilter = this.handleReleaseYearFilter.bind(this);
    this.handleRuntimeFilter = this.handleRuntimeFilter.bind(this);
    this.handleRuntimeSelection =this.handleRuntimeSelection.bind(this);
    this.updateReleaseYearInputs = this.updateReleaseYearInputs.bind(this);
    this.resetRuntimeSelector = this.resetRuntimeSelector.bind(this);
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
      const userSelectedGenres = [];
      const releaseYearMin = null;
      const releaseYearMax = null;
      const runtimeSelection = null;

      this.setState({
        seedFilms,
        recommendation,
        recommendationSubset,
        userSelectedGenres,
        releaseYearMin,
        releaseYearMax,
        runtimeSelection
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
    // disable updateRecommendation() until item based script is fixed.
    this.updateRecommendation();  
    this.fetchFilms();
    document.getElementById("addSeedFilmNav").style.display = "none";
  }
  
  handleReleaseYearMin(event){  
    this.setState({
      releaseYearMin: event.target.value
    });
  }
  
  
  handleReleaseYearMax(event){  
    this.setState({
      releaseYearMax: event.target.value
    });
  }
  
  handleRuntimeSelection(event){
   	var e = document.getElementById("runtime-selector");
    var strUser = e.options[e.selectedIndex].value;
  	this.setState({
      runtimeSelection: strUser 
    });
  
  }
  
   handleRuntimeFilter(){
     const runtimeSelection = this.state.runtimeSelection;
	 const recommendationSubset = this.state.recommendation;
     let recommendationSubsetTemp = [];
     let output_str ="";
    
     recommendationSubset.forEach(film => {
	 var i = parseInt(film.runtime);
       
     if(!recommendationSubsetTemp.includes(film)){
       if(runtimeSelection === "1hr_or_less" && i <= 60  ){
         recommendationSubsetTemp.push(film);
       }
        	
       else if(runtimeSelection === "1_to_2_hrs" && 60 < i  && i <= 120 ){
         recommendationSubsetTemp.push(film);
       }
        	
       else if(runtimeSelection === "2hrs_or_more" && 120 < i){
         recommendationSubsetTemp.push(film);
       }
      }
	});
	
	// If recommendation subset is not undefined or empty, update the state
	if(typeof recommendationSubsetTemp !== 'undefined' && recommendationSubsetTemp.length > 0){
  	  this.setState({recommendationSubset: recommendationSubsetTemp});
  	}
  	else{
  	  if(runtimeSelection === "1hr_or_less") output_str = "1 hr or less";
  	  else if(runtimeSelection === "1_to_2_hrs") output_str = "between 1 to 2 hrs";
      else if(runtimeSelection === "2hrs_or_more") output_str = "2 hrs or more";
  	
  	  alert( "No results for films that are " + output_str  +".");
  	  //Clear the min and max runtime input queries
  	  this.resetRuntimeSelector();
  	  this.setState({
  	    recommendationSubset: recommendationSubset,
  		runtimeSelection: null
  	  });
    } 
  }
  
  
  handleReleaseYearFilter(){
	const recommendationSubset = this.state.recommendation;
    let min_year = parseInt(this.state.releaseYearMin, 10);
    let max_year = parseInt(this.state.releaseYearMax, 10);
    let recommendationSubsetTemp = [];
    
    // If user does not fill in second parameter, fill in with min value and update query display.
    if(min_year && !max_year){
    	 max_year = min_year;
    	this.updateReleaseYearInputs(min_year, max_year); 
    	this.setState({
    		releaseYearMin: min_year,
    		releaseYearMax: max_year
    	});
    }
    
    // If the user does not fill in the first parameter, fill in with the max value and update query display.
    if(!min_year && max_year ){
    	min_year = max_year;
    	this.updateReleaseYearInputs(min_year, max_year); 
    	this.setState({
    		releaseYearMin: min_year,
    		releaseYearMax: max_year
    	});
    }
    
   //If the user's input is invalid, i.e. the user enters symbols letters etc.
   if (!/^\d{4}$/.test(min_year) ||  !/^\d{4}$/.test(max_year)) {
        alert("Invalid input! Please enter a 4-digit release year.");
    	// Clear input box text
    	this.updateReleaseYearInputs();
    	
    	this.setState({
    		recommendationSubset: recommendationSubset,
    		releaseYearMin: null,
    		releaseYearMax: null
    	});
    	return;
    }
    
    // If min year is greater than the max year
    if(min_year > max_year ){
    	//alert("Invalid input! The minimum release year value exceeds the maximum input value.");
    	let temp = min_year;
    	min_year = max_year;
    	max_year = temp;
    	
    	this.updateReleaseYearInputs(min_year, max_year);
    	
    	this.setState({
    		recommendationSubset: recommendationSubset,
    		releaseYearMin: min_year,
    		releaseYearMax: max_year
    	});
    }
    
	//If every condition is passed, push the film into the recommendation subset array.
    recommendationSubset.forEach(film => {
		var i = parseInt(String(film.release_date).substring(0, 4),10);
		// if i is between min year and max year
        if( min_year <= i &&  i <= max_year  && !recommendationSubsetTemp.includes(film)) {
        	recommendationSubsetTemp.push(film);
      	}
	});
	
	// If recommendation subset is not undefined or empty, update state
	if(typeof recommendationSubsetTemp !== 'undefined' && recommendationSubsetTemp.length > 0){
  		this.setState({recommendationSubset: recommendationSubsetTemp});
  	}
  	else{
  		// If rec. subset is empty, set to that of the full recommendation set
  		alert("The recommendation results do not contain any films between " + String(min_year) + " and " + String(max_year) + ".");
        this.updateReleaseYearInputs();
  		this.setState({
    		recommendationSubset: recommendationSubset,
    		releaseYearMin: null,
    		releaseYearMax: null
    	});
  	}
  }


    handleGenreFilter(value, e) {
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

      const recommendationTemp = this.state.recommendation;
      let userSelectedGenres = this.state.userSelectedGenres;
      let recommendationSubsetTemp = [];
      let x = this.state.recommendation;
   
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
    
      recommendationTemp.forEach(film => {
        //Execute this if there is at least one genre filter selected
        if(typeof userSelectedGenres !== 'undefined' && userSelectedGenres.length > 0) { 
          film.genres.forEach(genre => {
            if(userSelectedGenres.includes(genre.name) && !recommendationSubsetTemp.includes(film)) {
              recommendationSubsetTemp.push(film);
            }   
          });
        } 
        else { 
          recommendationSubsetTemp.push(film);
        } 
      });
    
  	  this.setState({
        recommendationSubset: recommendationSubsetTemp,
        userSelectedGenres: userSelectedGenres
      });  
  }
  
  //Reset runtime selector
  resetRuntimeSelector(){ 
    document.getElementById('runtime-selector').selectedIndex = 0;
  }
  
  //Clear input text boxes, default empty string values
  //Utilized this method because setState will not clear input box
  updateReleaseYearInputs(string_1="", string_2=""){
  	document.getElementById('min_year_input').value=string_1;
    document.getElementById('max_year_input').value=string_2;
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
    this.resetRuntimeSelector();
    this.updateReleaseYearInputs();
    
    this.setState({
      recommendationSubset: recommendationSubset,
      userSelectedGenres: userSelectedGenres,
      releaseYearMin: null,
      releaseYearMax: null,
      runtimeSelection: null
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
          <SideBarFilter onGenreFilter={this.handleGenreFilter} onRuntimeSelection={this.handleRuntimeSelection}  onRuntimeFilter={this.handleRuntimeFilter}  onReleaseYearMin={this.handleReleaseYearMin}  onReleaseYearMax={this.handleReleaseYearMax} onReleaseYearFilter={this.handleReleaseYearFilter} onFilterReset={this.handleFilterReset}/>
                    
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
