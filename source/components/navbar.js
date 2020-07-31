import React from 'react';
import { Link } from 'react-router';

const NavBar = (props) =>
  <nav className="navbar navbar-inverse navbar-static-top">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">Journal</a>
      </div>
      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li><Link activeClassName="app_underline" to="/notes">Notes</Link></li>
          <li><Link activeClassName="app_underline" to="/tasks">Tasks</Link></li>
          <li><Link activeClassName="app_underline" to="/history">History</Link></li>
          <li><Link activeClassName="app_underline" to="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  </nav>;

export default NavBar;
