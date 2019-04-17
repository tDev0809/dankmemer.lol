import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';

import parseTime from '../../util/parseTime.js';

const NavBar = ({
  discount,
  login: { loggedIn, username, discriminator, isAdmin }
}) => (
  <nav className="navbar">
    <span className="DM-nav">DANK MEMERR</span>
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
        <NavLink className="nav-link premium" activeClassName="active" to="/loot" data-discount={discount ? `FLASH SALE (${parseTime(discount.expiry - Date.now()).hours}H LEFT)` : ''}>LOOTBOXES</NavLink>
      </li>
      {isAdmin ? <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/admin">ADMIN</NavLink>
      </li> : ''}
      <li className="nav-item">
        {loggedIn ? (
          <div className="user">
              <span className="nav-link">{`${username.toUpperCase()}#${discriminator}`}</span>
              <a className="nav-link" href='/oauth/logout'>LOG OUT</a>
          </div>
        ) : (<a className="nav-link" href='/oauth/login'>LOG IN</a>) }
      </li>
    </ul>
  </nav>
);

export default withRouter(connect(store => store)(NavBar));
