import React, { Component } from 'react';
import './App.css';
import Navbar from './component/navbar';
import Recommendation from './component/recommendation';
import Footer from './component/footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Recommendation />
        <Footer />
      </div>
    );
  }
}

export default App;
