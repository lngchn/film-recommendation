import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
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
    this.onHeartClick = this.onHeartClick.bind(this);
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

  // Get a list of suggestions from the this.state.films
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const films = this.state.films;
    return inputLength === 0 || films === undefined ? [] : films.filter(lang =>
      lang.title.toLowerCase().slice(0, inputLength) === inputValue
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
      <span className='suggestion-content'>
        {image}
        <span className="name">
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
          <span id="searchBarHeart">
            <a href="#"><i className="fa fa-heart-o fa-2x" aria-hidden="true"></i></a>
            <a href="#" onClick={(event) => this.onHeartClick(suggestion.id, suggestion.title, suggestion.poster_path, event)}><i className="fa fa-heart fa-2x" aria-hidden="true"></i></a>
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

  onHeartClick(id, title, poster_path, event) {
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
        imdb_id: '',
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
