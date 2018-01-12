import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <span>
    <div id="landing-header">
      <h1>Welcome to YelpCamp!</h1>
      <Link to="/campgrounds" className="btn btn-lg btn-success">
        <i className="fa fa-tree pull-left" />
        Get Started
      </Link>
    </div>
    <ul className="slideshow">
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
  </span>
);

export default LandingPage;