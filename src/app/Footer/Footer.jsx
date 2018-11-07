import React, { Component } from 'react';
import './Footer.css' 
import { onClickLink } from '../Utils/Tracking.js';

class Footer extends Component {
render(){
    return(
      <footer className="footer">
        <div className="footer-table">
          <div className="footer-group footer-copyright">
            <span className="copyright">Copyright © 2018 Dank Memer Team</span>
          </div>
          <div className="footer-group footer-links">
          <a className="footer-link" onClick={onClickLink('FootRules')} href="/rules">Bot Rules</a>
          <a className="footer-link" onClick={onClickLink('FootStats')} href="/stats">Stats</a>
            <a className="footer-link" onClick={onClickLink('FootGit')} href="https://github.com/Dank-Memer">GitHub</a>
            <a className="footer-link" onClick={onClickLink('FootTwit')} href="https://twitter.com/dankmemerbot">Twitter</a>
            <a className="footer-link" onClick={onClickLink('FootServer')} href="https://discord.gg/Wejhbd4" >Server</a>
            <a className="footer-link" onClick={onClickLink('FootDBL')} href="https://discordbotlist.com/bots/270904126974590976">DBL</a>
          </div>
        </div>
      </footer>      
    )
  }
}

export default Footer;