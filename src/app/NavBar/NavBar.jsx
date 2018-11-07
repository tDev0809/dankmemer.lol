import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { onClickLink } from '../Utils/Tracking.js';

class NavBar extends Component {

  render() {
    return(
      <nav className="navbar">
        <span className="DM-nav">DANK MEMER</span>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" onClick={onClickLink('HOMENAV')} to="/">HOME</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" onClick={onClickLink('CMDNAV')} to="/commands">COMMANDS</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" onClick={onClickLink('DEVNAV')} to="/devs">DEVS</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link premium" onClick={onClickLink('PREMNAV')} to="/premium">PREMIUM</NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar;