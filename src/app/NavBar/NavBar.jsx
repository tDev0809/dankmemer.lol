import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return(
      <nav className="navbar">
        <span className="DM-nav">DANK MEMER</span>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/">HOME</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/commands">COMMANDS</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/about">ABOUT</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link premium" activeClassName="active" to="https://www.patreon.com/dankmemerbot">PREMIUM</NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar;