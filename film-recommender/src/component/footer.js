import React from 'react';
import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="container-fluid text-light text-center">
        <div className="row justify-content-center navbar-dark bg-dark">
          <div className="col-auto">
            <nav className="nav footer-link mt-4">
              <a className="nav-link" href="#">Home</a>
              <a className="nav-link" href="#">About</a>
              <a className="nav-link" href="#">FAQ</a>
              <a className="nav-link" href="#">Contact</a>
            </nav>
            <p className="mb-4">Film Pro &copy; 2017</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;