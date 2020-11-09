import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.css';

export default React.memo(() => (
  <footer className="footer">
    <div className="footer-table">
      <div className="footer-group footer-copyright">
        <span className="copyright">Copyright © {new Date().getFullYear()} Dank Memer</span>
      </div>
      <div className="footer-group footer-links">
        <a className="footer-link" href="https://www.patreon.com/join/dankmemerbot?">Premium</a>
        <NavLink className="footer-link" to="/staff">Staff</NavLink>
        <NavLink className="footer-link" to="/rules">Rules</NavLink>
        <NavLink className="footer-link" to="/terms">Terms</NavLink>
        <NavLink className="footer-link" to="/privacy">Privacy</NavLink>
        <NavLink className="footer-link" to="/appeals">Appeals</NavLink>
        <NavLink className="footer-link" to="/reports">Reports</NavLink>
      </div>
    </div>
  </footer>
));
