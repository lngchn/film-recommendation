import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './component/login';
import Register from './component/register';
import Navbar from './component/navbar';
import Home from './component/home';
import Recommendation from './component/recommendation';
import Activity from './component/activity';
import People from './component/people';
import Footer from './component/footer';
import NotFound from './component/not-found';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            {/* <Redirect exact from="/" to="/recommendation" /> */}
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/recommendation" component={Recommendation} />
            <Route path="/activity" component={Activity} />
            <Route path="/people" component={People} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
