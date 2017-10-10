import React from 'react';
import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="container-fluid text-light text-center">
        <div className="row navbar-dark bg-dark">
          <div className="col">
            <nav className="nav justify-content-center mt-4 footer-link">
              <a className="nav-link" href="/">Home</a>
              <a className="nav-link" href="#">About</a>
              <a className="nav-link" href="#">FAQ</a>
              <a className="nav-link" href="#">Contact</a>
            </nav>
            <nav className="nav justify-content-center footer-link">
              <a className="nav-link pr-2" href="http://www.facebook.com"><i className="fa fa-facebook-official" aria-hidden="true"/></a>
              <a className="nav-link pr-2" href="https://www.pinterest.com"><i className="fa fa-instagram" aria-hidden="true"/></a>
              <a className="nav-link pr-2" href="https://www.twitter.com"><i className="fa fa-twitter" aria-hidden="true"/></a>
              <a className="nav-link" href="https://www.tumblr.com"><i className="fa fa-tumblr-square" aria-hidden="true"/></a>
            </nav>
            <p className="mt-2 mb-4">Film Pro &copy; 2017</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;