import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/memer.png';

import './Footer.scss';

export default React.memo(() => (
	<footer>
    	<div id="footer-content">
      		<div id="footer-left">
				<Link to="/"><img id="footer-logo" src={Logo} alt="Dank Memer logo" /></Link>
				<div id="footer-left-text">
					<h2 id="footer-title">DANK MEMER</h2>
					<span id="footer-copyright">Copyright © {new Date().getFullYear()} Dank Memer</span>
				</div>
			</div>
			<div id="footer-links">
				<div id="footer-links-col">
					<a id="footer-link" href="https://www.patreon.com/join/dankmemerbot">Premium</a>
					<Link id="footer-link" to="/commands">Commands</Link>
					<Link id="footer-link" to="/blogs">Our blog</Link>
				</div>
				<div id="footer-links-col">
					<Link id="footer-link" to="/staff">Staff</Link>
					<Link id="footer-link" to="/terms">Terms</Link>
					<Link id="footer-link" to="/privacy">Privacy</Link>
				</div>
				<div id="footer-links-col">
					<Link id="footer-link" to="/rules">Rules</Link>
					<Link id="footer-link" to="/reports">Reports</Link>
					<Link id="footer-link" to="/appeals">Appeals</Link>
				</div>
			</div>
    	</div>
  	</footer>
));
