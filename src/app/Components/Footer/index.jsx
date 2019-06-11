import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.css';

export default React.memo(() => (
  <footer className="footer">
    <div className="footer-table">
      <div className="footer-group footer-copyright">
        <span className="copyright">Copyright © {new Date().getFullYear()} Melms Media LLC</span>
      </div>
      <div className="footer-group footer-links">
        <a className="footer-link" href="https://www.patreon.com/join/dankmemerbot?">Premium</a>
        <NavLink className="footer-link" to="/staff">Staff</NavLink>
        <a className="footer-link" href="https://dankmemer.services/documentation">API</a>
        <NavLink className="footer-link" to="/rules">Rules</NavLink>
        <NavLink className="footer-link" to="/terms">Terms</NavLink>
        <NavLink className="footer-link" to="/privacy">Privacy</NavLink>
        <NavLink className="footer-link" to="/appeals">Appeals</NavLink>
      </div>
    </div>
  </footer>
));
