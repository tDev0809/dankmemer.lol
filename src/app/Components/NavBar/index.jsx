import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.css';
import parseTime from '../../util/parseTime.js';

const NavBar = ({
  discount,
  login: { loggedIn, username, discriminator, isAdmin }
}) => {
  const [ navExpanded, setNavExpanded ] = useState(false);
  const [ userExpanded, setUserExpanded ] = useState(false);
  const onClick = (target) => {
    let expanded = !userExpanded;
    setUserExpanded(expanded);
    if (expanded) {
      target.children[0].classList.add('nav-user-expanded-container');
      target.children[1].classList.add('nav-user-expanded');
    } else {
      target.children[0].classList.remove('nav-user-expanded-container');
      target.children[1].classList.remove('nav-user-expanded');
    }
  }
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
          <NavLink className="nav-link" activeClassName="active" to="/blogs">BLOG</NavLink>
        </li>
        {navigator.onLine && <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/staff">STAFF</NavLink>
        </li>}
        {/* {navigator.onLine && <li className="nav-item">
          <NavLink className="nav-link premium" activeClassName="active" to="/loot" data-discount={discount ? `FLASH SALE (${parseTime(discount.expiry - Date.now()).hours}H LEFT)` : ''}>LOOTBOXES</NavLink>
        </li>} */}
        {navigator.onLine && <div className="login">
          {loggedIn ? (
            <li className="user nav-item" onClick={(e) => onClick(e.target.parentElement)}>
                <span className="nav-link">{`${username.toUpperCase()}#${discriminator}`}</span>
                <div className='nav-user'>
                  <a className="nav-link login-button" href='/oauth/logout'>Log Out</a>
                </div>
            </li>
          ) : (<a href="/oauth/login"><button className="obutton login-button">LOG IN</button></a>) }
        </div>}
      </ul>
      
    </nav>
  )
};

export default withRouter(connect(store => store)(NavBar));
