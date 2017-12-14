import React, { Component } from 'react';
import './profile.css';

import { Redirect } from 'react-router-dom';
import FormValidation from '../helperFunctions/formValidation';

class Profile extends Component{
  constructor(){
    super();
    this.state = {
	    username: '',
      email: '',
      ratedFilms: '',
      isLoggedIn: true
    }
    this.fetchUser = this.fetchUser.bind(this);
  }

 fetchUser() {
    fetch("/user/profile", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin"
    })
    .then(res => res.json())
    .then(user => {
      const username = user.username;
      const email = user.email;
      const ratedFilms = user.ratedFilms;

      this.setState({
        username,
        email,
        ratedFilms,
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  }


  render() {
      return (
        <div className="jumbotron jumbotron-fluid m-0 text-center" id="main-profile">
          <div className="container" id="main-profile-content">
            <img src="http://placehold.it/200x200" className="rounded avatar img-responsive"></img>
            <h1 className="display-4">{this.state.username}</h1>
            <h1 className="display-4">{this.state.email}</h1>
            <h1 className="display-4">{this.state.ratedFilms}</h1>
            <ul className="text-center" id="list-buttons">
              <li><button type="button" className="btn btn-outline-success mt-4 p-3">Edit Profile</button></li>
              <li><button type="button" className="btn btn-outline-success mt-4 p-3">Change Password</button></li>
              <li><button type="button" className="btn btn-outline-success mt-4 p-3">Take Me To The Homepage</button></li>
            </ul>          
          </div>
      </div>
      )
    }

};

export default Profile;