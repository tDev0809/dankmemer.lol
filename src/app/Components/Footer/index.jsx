import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.css';

export default React.memo(() => (
  <footer className="footer">
    <div className="footer-table">
      <div className="footer-group footer-copyright">
        <span className="copyright">Copyright © {new Date().getFullYear()} Dank Memer Team</span>
      </div>
      <div className="footer-group footer-links">
        <a className="footer-link" href="https://dankmemer.services/documentation">API</a>
        <NavLink className="footer-link" to="/rules">Rules</NavLink>
        <NavLink className="footer-link" to="/terms">Terms</NavLink>
        <NavLink className="footer-link" to="/privacy">Privacy</NavLink>
        <a className="footer-link" href="https://github.com/DankMemer">GitHub</a>
        <a className="footer-link" href="https://twitter.com/dankmemerbot">Twitter</a>
        <a className="footer-link" href="https://discord.gg/Wejhbd4">Server</a>
      </div>
    </div>
  </footer>
));
