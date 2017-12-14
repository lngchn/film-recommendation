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
        <div className="container-fluid" id="container-profile">
          <div className="row" id="main-profile">
            <div className="rounded col-4 text-center" id="profile-sidebar">
              <img src="https://d2g50grrs5gsgl.cloudfront.net/images/placeholders/default-user-pic-display-fp-25783b166928d6761389e6d34279290e.gif" className="rounded avatar img-responsive"></img>
              <p className="strong">Username {this.state.username}</p>
              <p className="strong">Email {this.state.email}</p>
              <ul id="list-buttons">
                <li><button type="button" className="btn btn-outline-secondary btn-sm btn-block">Edit Profile</button></li>
                <li><button type="button" className="btn btn-outline-secondary btn-sm btn-block">Change Password</button></li>
              </ul>  
            </div>
            <div className="rounded col-1 text-center">   
            </div>
            <div className="rounded col-7 text-center" id="profile-main">   
              <h1 className="display-4">{this.state.ratedFilms}</h1>
              <h1>Rated Films</h1>
            </div>     
          </div>
        </div>
      )
    }

};

export default Profile;