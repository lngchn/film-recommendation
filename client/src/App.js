import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './component/login';
import Register from './component/register';
import Navbar from './component/navbar';
import Home from './component/home';
import Movie from './component/movie';
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

function LoginOrRegisterRoute({component: Component, isAuthed, onAuthChange, ...rest}) {
  return(
    <Route 
      {...rest}
      render={(props) => isAuthed === true 
        ? <Redirect to={{pathname: '/', state: {from: props.location}}} />
        : <Component onAuthChange={onAuthChange} {...props} /> }
    />
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = { isAuthed: false };
    this.handleAuth = this.handleAuth.bind(this);
  }

  componentWillMount() {
    // You need credentials: "same-origin" for express session to work.
    fetch("/auth", {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
    })
    .then(res => {
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

  handleAuth(isAuthed) {
    this.setState({isAuthed: isAuthed});
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar isAuthed={this.state.isAuthed} onAuthChange={this.handleAuth} />
          <Switch>
            {/* <Redirect exact from="/" to="/recommendation" /> */}
            <Route exact path="/" component={Home} />
            <Route path="/movie/:id" component={Movie} />
            <LoginOrRegisterRoute isAuthed={this.state.isAuthed} onAuthChange={this.handleAuth} path="/login" component={Login} />
            <LoginOrRegisterRoute isAuthed={this.state.isAuthed} onAuthChange={this.handleAuth} path="/register" component={Register} />
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
