import React, { Component } from 'react';
import './App.css';
import Navbar from './component/navbar';
import Recommendation from './component/recommendation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Recommendation />
      </div>
    );
  }
}

export default App;
