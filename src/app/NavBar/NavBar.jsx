import React, { Component } from 'react';
import { NavLink, withRouter   } from 'react-router-dom';
import { connect } from 'react-redux';
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
            <NavLink className="nav-link" activeClassName="active" to="/staff">STAFF</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/loot">LOOTBOXES</NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link premium" href="https://www.patreon.com/join/dankmemerbot?">PREMIUM</a>
          </li>
          {this.props.isAdmin ? <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/admin">ADMIN</NavLink>
          </li> : ''}
          <li className="nav-item">
            {this.props.loggedIn ? (
              <div className="user">
                  <span className="nav-link">{`${this.props.username.toUpperCase()}#${this.props.discriminator}`}</span>
                  <a className="nav-link" href='/oauth/logout'>LOG OUT</a>
              </div>
            ) : (<a className="nav-link" href='/oauth/login'>LOG IN</a>) }
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(connect(store => store.login)(NavBar));
