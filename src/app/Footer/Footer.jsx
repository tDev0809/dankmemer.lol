import React, { Component } from 'react';
import './Footer.css' 
import { NavLink } from 'react-router-dom';

class Footer extends Component {
render(){
    return(
      <footer className="footer">
        <div className="footer-table">
          <div className="footer-group footer-copyright">
            <span className="copyright">Copyright © 2018 Dank Memer Team</span>
          </div>
          <div className="footer-group footer-links">
          <NavLink className="footer-link" to="/rules">Bot Rules</NavLink>
            <a className="footer-link" href="https://github.com/Dank-Memer">GitHub</a>
            <a className="footer-link" href="https://twitter.com/dankmemerbot">Twitter</a>
            <a className="footer-link" href="https://discord.gg/Wejhbd4" >Server</a>
            <a className="footer-link" href="https://discordbotlist.com/bots/270904126974590976">DBL</a>
          </div>
        </div>
      </footer>      
    )
  }
}

export default Footer;