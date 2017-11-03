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

function PrivateRoute({component: Component, isAuthed, ...rest}) {
  return(
    <Route 
      {...rest}
      render={(props) => isAuthed === true 
        ? <Component {...props} /> 
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  );
}

function LoginOrRegisterRoute({component: Component, isAuthed, ...rest}) {
  return(
    <Route 
      {...rest}
      render={(props) => isAuthed === true 
        ? <Redirect to={{pathname: '/', state: {from: props.location}}} />
        : <Component {...props} /> }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = { isAuthed: false };
  }

  componentWillMount() {
    fetch("/auth")
    .then(res => {
      console.log(res);
      if(res.status === 200) {
       this.setState({ isAuthed: true });
      } else {
        this.setState({ isAuthed: false });
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar isAuthed={this.state.isAuthed} />
          <Switch>
            {/* <Redirect exact from="/" to="/recommendation" /> */}
            <Route exact path="/" component={Home} />
            <LoginOrRegisterRoute isAuthed={this.state.isAuthed} path="/login" component={Login} />
            <LoginOrRegisterRoute isAuthed={this.state.isAuthed} path="/register" component={Register} />
            <PrivateRoute isAuthed={this.state.isAuthed} path="/recommendation" component={Recommendation} />
            <PrivateRoute isAuthed={this.state.isAuthed} path="/activity" component={Activity} />
            <PrivateRoute isAuthed={this.state.isAuthed} path="/people" component={People} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
