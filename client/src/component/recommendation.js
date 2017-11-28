import React from 'react';
import ReactStars from 'react-stars';

import './recommendation.css';


function SideBarFilter(props) {
	return(<nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar text-left pt-3 border border-dark border-top-0 border-bottom-0 border-left-0">
   		<nav className="nav flex-column filter-link">
    
      	<div className="checkbox">
        	<a className="nav-link nav-item" href="#" > <input type="checkbox" value="Adventure"  onChange={(event) => props.onFilterChange(event) }  /> Adventure</a><br />
           	<a className="nav-link nav-item" href="#" ><input type="checkbox"  value="Action"  onChange={(event) => props.onFilterChange(event) }  /> Action</a><br />
           	<a className="nav-link nav-item" href="#" ><input type="checkbox"  value="Animation"  onChange={(event) => props.onFilterChange(event) }  /> Animation</a><br />
       	   	<a className="nav-link nav-item" href="#" ><input type="checkbox"  value="Comedy"  onChange={(event) => props.onFilterChange(event) }  /> Comedy</a><br />
		   	<a className="nav-link nav-item" href="#" ><input type="checkbox"  value="Documentary"  onChange={(event) => props.onFilterChange(event) }  /> Documentary</a><br />
		   	<a className="nav-link nav-item" href="#" ><input type="checkbox"  value="Drama"  onChange={(event) => props.onFilterChange(event) }  /> Drama</a><br />
		   	<a className="nav-link nav-item" href="#" ><input type="checkbox"  value="Horror"  onChange={(event) => props.onFilterChange(event) }  /> Horror</a><br />
		   	<a className="nav-link nav-item" href="#" ><input type="checkbox"  value="Science Fiction"  onChange={(event) => props.onFilterChange(event) }  /> Sci-Fi</a><br />
			<a className="nav-link nav-item" href="#" ><input type="checkbox"  value="Fantasy"  onChange={(event) => props.onFilterChange(event) }  /> Fantasy</a>
		    <a className="nav-item nav-link text-right" href="#">More</a>
      	</div>
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
      recommendation: [],
      recSubset: [],
      userSelectedGenres: []
      
    };
    this.handleSeedDelete = this.handleSeedDelete.bind(this);
    this.handleSeedAdd = this.handleSeedAdd.bind(this);
    this.fetchFilms = this.fetchFilms.bind(this);
    this.updateRecommendation = this.updateRecommendation.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this)
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
      const ratedFilms = user.ratedFilms.sort((filmA, filmB) => filmA.title < filmB.title ? -1 : 1);
      const seedFilms = user.seedFilms;
      const recommendation = user.recommendation;
      const recSubset = user.recommendation;
      const userSelectedGenres = [];

      this.setState({
        ratedFilms,
        seedFilms,
        recommendation,
        recSubset,
        userSelectedGenres
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
    // When the user delete a seed film, it doesn't call updateRecommendation()
    // to update the recommendation films because the current implementation will 
    // require multiple calls, which is too heavy on the TMDB API.
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

  updateRecommendation() {
    fetch("/recommendation", {
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
  

	handleFilterChange(e) {
  		const recommendation = this.state.recommendation;
    	let userSelectedGenres = this.state.userSelectedGenres;
   	 	let recSubset = [];
   
      if(e.target.checked){
            userSelectedGenres.push(e.target.value);
        }
        else{
            //Add to user genre selections
            for(let i =0; i <  userSelectedGenres.length; i++){
                if( userSelectedGenres[i] === e.target.value){
                    userSelectedGenres.splice(i, 1);
                } 
            }  
        }  
     	
      	recommendation.forEach(film => {
      	//Execute this if there is at least one genre filter selected
      		if(typeof userSelectedGenres !== 'undefined' && userSelectedGenres.length > 0){ 
  				film.genres.forEach(genre => {
   					if(userSelectedGenres.includes(genre.name)) {
   						recSubset.push(film);
   					} 	
  		  		});
  		   // Else, clear genre selections
  		  	}else{ 
  		  		recSubset.push(film);
  		  	}	
  		});
	  	 		
        this.setState({recSubset: recSubset} );
        this.setState({userSelectedGenres: userSelectedGenres} );
          
    }

  render() {
    let ratedFilms = this.state.ratedFilms.map(movie => <RatedFilm data={movie} key={movie.id} onSeedAdd={this.handleSeedAdd} />);
    let seedFilms = this.state.seedFilms.map(movie => <SeedFilm data={movie} key={movie.id} onSeedDelete={this.handleSeedDelete} />);
    //let recommendation = this.state.recommendation.map(movie => <RecommendationFilm data={movie} key={movie.id} />);
	let recSubset = this.state.recSubset.map(movie => <RecommendationFilm data={movie} key={movie.id} />);
    return(
      <div className="container-fluid">
        <div className="row">
          <SideBarFilter  onFilterChange = {this.handleFilterChange} />

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
           
               {recSubset}
              </section>
            </div>
          </main>

          <div id="addSeedFilmNav">
            <a href="#" className="closebtn" onClick={this.closeNav}>&times;</a>
              <div className="row" id="overlay-main">
                <div className="col-6" id="overlay-content">
                  {ratedFilms}
                </div>
              </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Recommendation;
