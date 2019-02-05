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
            <NavLink className="nav-link" activeClassName="active" to="/devs">DEVS</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/loot">LOOT</NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link premium" href="https://www.patreon.com/join/dankmemerbot?">PREMIUM</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar;