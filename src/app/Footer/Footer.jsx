import React, { Component } from 'react';
import './Footer.css' 

class Footer extends Component {
render(){
    return(
      <footer className="footer">
        <div className="footer-column">
          <p>Created by the Dank Memer team.</p>
        </div>
        <div className="footer-column">
          <span className="footer-header">Social</span>
          <div className="footer-content">
            <a className="footer-link" href="https://github.com/Dank-Memer">GitHub</a>
            <a className="footer-link" href="https://twitter.com/dankmemerbot">Twitter</a>
            <a className="footer-link" href="https://discord.gg/9dsqMJ5" >Discord Server</a>
          </div>
        </div>
        <div className="footer-column">
          <span className="footer-header">Site</span>
          <div className="footer-content">
            <span>stuff</span>
            <span>Other stuff</span>
          </div>
        </div>
        
      </footer>      
    )
  }
}

export default Footer;