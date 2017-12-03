import React, { Component } from 'react';
import './movie.css';

function CalculateMovieReleaseDate(date){
  if (date === undefined){
    return;
  }

  let release_date = date.toString();
  let year = release_date.substr(0,4);
  let month = release_date.substr(5,2);
  let day = release_date.substr(8,2);

  switch(month){
    case '01':
      month = 'January';
      break;
    case '02':
      month = 'February';
      break;
    case '03':
      month = 'March';
      break;
    case '04':
      month = 'April';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'June';
      break;
    case '07':
        month = 'July';
        break;
    case '08':
        month = 'August'
        break;
    case '09':
        month = 'September';
        break;
    case '10':
        month = 'October';
        break;
    case '11':
        month = 'November';
        break;
    case '12':
        month = 'December';
        break;
      }
      return month + ' ' + day + ', ' + year;
}

function CalculateBudget (amount){
  if (amount === 0){
    return 'N/A';
  } else if (Number.isNaN(amount)){
    return '';
  } else {
    let budget = parseInt(amount, 10);
    let value = budget.toLocaleString('en');
    return value + ' (USD)';
  }
}

function CalculateEarnings(amount){
  if (amount === 0){
    return 'N/A';
  } else if (Number.isNaN(amount)){
    return '';
  } else {
    let earnings = parseInt(amount, 10);
    earnings = (Math.ceil(earnings)).toLocaleString('en');
    return earnings + ' (USD)';
  }
}

function ExtractActors(cast){
  if (cast === undefined){
    return;
  }

  let actors = [];
  for (let i = 0; i < 5; i++){
    actors[i] = cast[i];
  }
  return actors;
}

function ExtractKeywords(keywords){
  let words = '';
  keywords.forEach(keyword =>{
   words = words.concat(keyword.name + ', ');
 });

  let i = words.lastIndexOf(',');
  words = words.substr(0, i);
  return words;
}

function ExtractGenres(genres){
  let words = '';
  genres.forEach(genre =>{
   words = words.concat(genre.name + ', ');
 });

  let i = words.lastIndexOf(',');
  words = words.substr(0, i);
  return words;
}

function CalculateMovieTime(runtime){
    if (Number.isNaN(runtime) || runtime === undefined){
      return "";
    } else return parseInt(runtime/60, 10) + 'h ' + runtime%60 + 'm';
}

class Movie extends Component{
  constructor(){
    super();
    this.state = {
      movie: {}
    };
  }

  componentDidMount(){
    fetch(`/film/${this.props.match.params.id}`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(movie => this.setState({movie: movie}))
    .catch(error => {
      console.log(error.message);
    });
  }

  render(){
    let directors = [];
    let producers = [];
    let writers = [];

    if (this.state.movie.credits !== undefined){
      for (var i = 0; i < this.state.movie.credits.crew.length; i++){
        if (this.state.movie.credits.crew[i].job === "Director" && directors.length < 5){
          directors.push(this.state.movie.credits.crew[i].name);
        } else if ((this.state.movie.credits.crew[i].job === "Producer" || "Executive Producer") && producers.length < 5){
          producers.push(this.state.movie.credits.crew[i].name);
        } else if ((this.state.movie.credits.crew[i].job === "Writer" || this.state.movie.credits.crew[i].department === "Writing") && writers.length < 5){
          writers.push(this.state.movie.credits.crew[i].name);
        }
      }
    }

      return (
        <div className="container-fluid">
          <div className="row movie">
            <div className= "col-sm-2 pt-5 pl-3 border border-dark border-top-0 border-left-0 border-bottom-0">
              <h2 className= "pl-3 pb-4 mt-3 text-light text-bold text-uppercase">{this.state.movie.title}</h2>
              <img src= {'https://image.tmdb.org/t/p/w500' + this.state.movie.poster_path} className=" pl-3 pr-4 pb-4 thumbnail img " width="230" height="300"  alt="Movie Poster"/>
              <div className= "pl-3 text-success text-uppercase text-bold">User Score: N/A </div>
              <div className= "pl-3 text-light text-bold">{CalculateMovieTime(this.state.movie.runtime)}</div>
              <div className= "pl-3 text-light text-bold">{CalculateMovieReleaseDate(this.state.movie.release_date)}</div>
              <div className= "pt-4 pl-3 text-light text-bold">DIRECTORS:
                {directors.map(member => {
                    return (
                      <div>{member}</div>
                    );
                  })
                }
              </div>
              <div className= "pt-4 pl-3 text-light text-bold">LANGUAGES:
                {this.state.movie.spoken_languages ?
                  this.state.movie.spoken_languages.map(language =>{
                  return (
                    <div className ="text-light text-bold">
                      {language.name}
                    </div>
                  );
                }): ""
              }
              </div>

              <div className= "pt-4 pl-3 text-light text-bold">STARRING:
                  {this.state.movie.credits ?
                    this.state.movie.credits.cast.slice(0,5).map(actor => {
                      return (
                        <div className ="text-light text-bold">
                          {actor.name}
                        </div>
                      );
                    }) : null
                  }
               </div>
              </div>

            <div className= "col-sm-2 pt-5 pl-3 border border-dark border-top-0 border-left-0 border-bottom-0">
              <div className= "pt-3 pl-3 text-light text-uppercase text-bold">WRITERS:</div>
              <div className= "pl-3 text-light">
                {writers.map(member => {
                    return (
                      <div>{member}</div>
                    );
                  })
                }
              </div>
              <div className= "pt-4 pl-3 text-light text-uppercase text-bold">Producers:</div>
              <div className= "pl-3 text-light">
                {producers.map(member => {
                    return (
                      <div>{member}</div>
                    );
                  })
                }
              </div>
              <div className= "pt-4 pl-3 text-light text-uppercase text-bold">Budget:</div>
              <span className= "pl-3 text-light text-bold">{CalculateBudget(this.state.movie.budget)}</span>
              <div className= "pt-4 pl-3 text-light text-uppercase text-bold">Box Office:</div>
              <div className= "pl-3 text-light text-bold">{CalculateEarnings(this.state.movie.revenue)}</div>
            </div>

            <div className= "col-sm-8 pt-5 pl-3">
              <div className= "embed-responsive embed-responsive-16by9">
                <iframe className= "pl-3 pt-3 embed-responsive-item" width="900" height="500" src={this.state.movie.videos ? 'https://www.youtube.com/embed/' + this.state.movie.videos.results[0].key: ""} frameBorder='0' allowFullScreen></iframe>
              </div>
              <p className= "pt-3 pl-3 text-secondary">{this.state.movie.overview}</p>
              <div className= "pt-3 pl-3 text-light text-bold">GENRES:
                <div>
                  {this.state.movie.genres ? ExtractGenres(this.state.movie.genres) : ""}
                  </div>
              </div>
              <div className= "pt-4 pl-3 pb-5 text-light text-bold">KEYWORDS:
                <div>
                  {this.state.movie.keywords ? ExtractKeywords(this.state.movie.keywords.keywords) : ""}
                </div>
              </div>
              <div className= "glyphicon glyphicon-heart float-right">Rate</div>
            </div>
          </div>
      </div>
      );
  }
}



export default Movie;
