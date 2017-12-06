import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

import ReactStars from 'react-stars';

import './searchbar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      value: '',
      suggestions: []
    };
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
  }

  handleChange = (event, { newValue }) => {
    fetch("/search", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // This is the body parameter
      body: JSON.stringify({
        query: newValue
      })
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        films: json.results
      });
    })
    .catch(err => {
      console.log(err.message);
    });

    this.setState({
      value: newValue
    });
  };

  handleRatingChange(id, title, poster_path, rating, event) {
    fetch("/user/ratedfilm", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        id: id,
        rating: rating,
        title: title, 
        poster_path: poster_path
      })
    })
    .then(res => {
      this.setState({
        value: ''
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Get a list of suggestions from the this.state.films
  getSuggestions = value => {
    const films = this.state.films;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    // Remove '-' char with space from the film title, such as 'Spider-man'
    films.forEach(film => film.title = film.title.replace('-', ' '));

    return inputLength === 0 || films === undefined ? [] : films.filter(film =>
      film.title.toLowerCase().includes(inputValue)
    );
  };

  // Suggestion should be based on movie title.
  getSuggestionValue = suggestion => suggestion.title;

  // Render the dropdown suggestion section
  renderSuggestion(suggestion, { query }) {
    const suggestionText = suggestion.title;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
    const imageUrl = `https://image.tmdb.org/t/p/w45/${suggestion.poster_path}`;
    let image = imageUrl.includes("null") ? <i className="fa fa-file-image-o fa-4x" aria-hidden="true"></i> : <img src={imageUrl} alt="Movie Poster" /> 
    const year = suggestion.release_date.substring(0, 4);
    const isAuthed = this.props.isAuthed;
    return (
      <span className='suggestion-content row ml-2'>
        {image}
        <span className="name col">
          {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
              return (
                <span className={className} key={index}>{part.text}</span>
              );
            })
          }
          {` (${year})`}
        </span>
        {isAuthed && 
          <span className="col-12 pl-0" id="film-rating">
            <ReactStars count={10}
                        half={false}
                        onChange={(event) => this.handleRatingChange(suggestion.id, suggestion.title, suggestion.poster_path, event)} 
                        size={24}
                        color2={'#ffd700'} />
          </span>}
      </span>
    );
  }

  // Async suggestion, the 1000 milliseconds is VERY IMPORTANT because it needs to wait
  // for TMDB API to respond.
  loadSuggestions = value => {
    setTimeout(() => {
      if (value === this.state.value) {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
      }
    }, 1000);
  };

  // Will be called every time a key is pressed.
  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };

  // Will be called when the input field is empty.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.handleChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default SearchBar;
