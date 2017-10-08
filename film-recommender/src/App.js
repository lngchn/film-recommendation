import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './component/navbar';
import Recommendation from './component/recommendation';
import Footer from './component/footer';
import NotFound from './component/not-found';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Redirect exact from="/" to="/recommendation" />
            <Route path="/recommendation" component={Recommendation} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
