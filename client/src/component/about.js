import React, { Component } from 'react';
import './about.css';

class About extends Component {
  render() {
    return(
      <div className="container-fluid" id="container-about">
      	<div className="rounded row text-center" id="about-main">
      		<h4 className="text-center">About Us.</h4>
      		<h4 className="text-center">An application that recommends films based on user ratings and film viewing preferences.</h4>
      		<h4 className="text-center">Filters information by using recommendations of other people through user-based collaborative filtering vs.item-based collaborative filtering User-based: recommends items from similar users</h4>
      		<h4 className="text-center">Future goals</h4>
      		<ul>
      			<li>Display similar films while on the details page.</li>
				<li>Display the average user rating for the film.</li>
				<li>Provide a nested movie details page within the  recommendation’s page.</li>
				<li>Further refine the styling of the page.</li>
			</ul>
      	</div>
      </div>
    );
  }
}

export default About;