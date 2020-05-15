import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';

import parseTime from '../../util/parseTime.js';
const NavBar = ({
  discount,
  login: { loggedIn, username, discriminator, isAdmin }
}) => {
  const [ navExpanded, setNavExpanded ] = useState(false);
  return (
    <nav className="navbar">
      <span className="DM-nav">DANK MEMER</span>
      <input className="navbar-btn" onChange={(e) => {
        let expanded = !navExpanded;
        setNavExpanded(expanded);
        if (expanded) {
          e.target.parentElement.classList.add('navbar-expanded');
        } else {
          e.target.parentElement.classList.remove('navbar-expanded');
        }
      }} type="checkbox" id="navbar-btn" />
      <label className="navbar-icon" htmlFor="navbar-btn"><span className="navicon"></span></label>
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
        {navigator.onLine && <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/blogs">BLOGS</NavLink>
        </li>}
        {navigator.onLine && <li className="nav-item">
          <NavLink className="nav-link premium" activeClassName="active" to="/loot" data-discount={discount ? `FLASH SALE (${parseTime(discount.expiry - Date.now()).hours}H LEFT)` : ''}>LOOTBOXES</NavLink>
        </li>}
        {navigator.onLine && <li className="login nav-item">
          {true ? (
            <div className="user">
                <span className="user-username nav-link">{`${'Nevulo' || username.toUpperCase()}#${'0007' || discriminator}`}</span>
                <a className="nav-link logout login-button" href='/oauth/logout'>LOG OUT</a>
            </div>
          ) : (<a href="/oauth/login"><button className="obutton login-button">LOG IN</button></a>) }
        </li>}
      </ul>
      
    </nav>
  )
};

export default withRouter(connect(store => store)(NavBar));
