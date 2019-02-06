import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  constructor () {
    super();

    this.state = {
      user: null
    };
  }

  async componentDidMount () {
    const res = await fetch('/oauth/state')
      .then(r => r.json());

    this.setState({
      user: res
    });
  }

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
            <a className="nav-link premium" href="https://www.patreon.com/join/dankmemerbot?">{}</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={this.state.user ? '/oauth/logout' : '/oauth/login'}>
              {this.state.user ? <span>LOG OUT<br />LOGGED IN AS {this.state.user.username.toUpperCase()}</span> : 'LOG IN'}
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar;