import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'assets/styles/components/navbar.scss';
import parseTime from '../util/parseTime.js';


export default function Navbar({ username, discriminator }) {
	const [navExpanded, setNavExpanded] = useState(false);
	const [userExpanded, setUserExpanded] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		try {
			if(navExpanded) return document.getElementById('pseudoBody').style.overflowY = 'hidden';
			else if(!navExpanded) return document.getElementById('pseudoBody').style.overflowY = 'auto';
			else return document.getElementById('pseudoBody').style.overflowY = 'auto';
		} catch (e) {
			console.error(e);
		}
	}, [navExpanded]);

	return (
		<nav id="navbar">
			<div id="navbar-mobile">
				<h2 id="navbar-mobile-text">Dank Memer</h2>
				<div id="navbar-mobile-hamburger" onClick={() => setNavExpanded(!navExpanded)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<line x1="4" y1="6" x2="20" y2="6" />
						<line x1="4" y1="12" x2="20" y2="12" />
						<line x1="4" y1="18" x2="20" y2="18" />
					</svg>
				</div>
				<div id="navbar-mobile-container" className={navExpanded ? 'visible' : ''}>
					<ul id="navbar-mobile-links">
						<NavLink
							className="navbar-mobile-link"
							activeClassName="active"
							exact to="/"
							onClick={() => {
								setTimeout(() => {
									setNavExpanded(!navExpanded);
								}, 1000)
							}}>Home</NavLink>

						<NavLink
							className="navbar-mobile-link"
							activeClassName="active"
							to="/commands"
							onClick={() => {
								setTimeout(() => {
									setNavExpanded(!navExpanded);
								}, 1000)
							}}>Commands</NavLink>

						<NavLink
							className="navbar-mobile-link"
							activeClassName="active"
							to="/blogs"
							onClick={() => {
								setTimeout(() => {
									setNavExpanded(!navExpanded);
								}, 1000)
							}}>Blog</NavLink>

						<NavLink
							className="navbar-mobile-link"
							activeClassName="active"
							to="/faq"
							onClick={() => {
								setTimeout(() => {
									setNavExpanded(!navExpanded);
								}, 1000)
							}}>FAQ</NavLink>

						<NavLink
							className="navbar-mobile-link"
							activeClassName="active"
							to="/loot"
							onClick={() => {
								setTimeout(() => {
									setNavExpanded(!navExpanded);
								}, 1000)
							}}>Store</NavLink>

						<a className="navbar-mobile-link" href="/oauth/login">{loggedIn ? username + discriminator : 'Login with Discord'}</a>
					</ul>
				</div>
			</div>
			<ul id="navbar-links">
				<li className="navbar-link"><NavLink activeClassName="active" exact to="/">Home</NavLink></li>
				<li className="navbar-link"><NavLink activeClassName="active" to="/commands">Commands</NavLink></li>
				<li className="navbar-link"><NavLink activeClassName="active" to="/blogs">Blog</NavLink></li>
				<li className="navbar-link"><NavLink activeClassName="active" to="/faq">FAQ</NavLink></li>
				<li className="navbar-link"><NavLink activeClassName="active" to="/loot">Store</NavLink></li>
				<li className="navbar-link"><a href="/oauth/login">{loggedIn ? username + discriminator : 'Login'}</a></li>
			</ul>
		</nav>
	);
};

// const NavBar = ({
//   discount,
//   login: { loggedIn, username, discriminator }
// }) => {
//   const [ navExpanded, setNavExpanded ] = useState(false);
//   const [ userExpanded, setUserExpanded ] = useState(false);
//   const onClick = (target) => {
//     let expanded = !userExpanded;
//     setUserExpanded(expanded);
//     if (expanded) {
//       target.children[0].classList.add('nav-user-expanded-container');
//       target.children[1].classList.add('nav-user-expanded');
//     } else {
//       target.children[0].classList.remove('nav-user-expanded-container');
//       target.children[1].classList.remove('nav-user-expanded');
//     }
//   }
//   return (
//     <nav className="navbar">
//       <span className="DM-nav">DANK MEMER</span>
//       <input className="navbar-btn" onChange={(e) => {
//         let expanded = !navExpanded;
//         setNavExpanded(expanded);
//         if (expanded) {
//           e.target.parentElement.classList.add('navbar-expanded');
//         } else {
//           e.target.parentElement.classList.remove('navbar-expanded');
//         }
//       }} type="checkbox" id="navbar-btn" />
//       <label className="navbar-icon" htmlFor="navbar-btn"><span className="navicon"></span></label>
//       <ul className="nav-links">
//         <li className="nav-item">
//           <NavLink exact className="nav-link" activeClassName="active" to="/">HOME</NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" activeClassName="active" to="/commands">COMMANDS</NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" activeClassName="active" to="/blogs">BLOG</NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" activeClassName="active" to="/faq">FAQ</NavLink>
//         </li>
//         {navigator.onLine && <li className="nav-item">
//           <NavLink className="nav-link premium" activeClassName="active" to="/loot" data-discount={discount ? `FLASH SALE (${parseTime(discount.expiry - Date.now()).hours}H LEFT)` : ''}>LOOTBOXES</NavLink>
//         </li>}
//         {navigator.onLine && <div className="login">
//           {loggedIn ? (
//             <li className="user nav-item" onClick={(e) => onClick(e.target.parentElement)}>
//                 <span className="nav-link">{`${username.toUpperCase()}#${discriminator}`}</span>
//                 <div className='nav-user'>
//                   <a className="nav-link login-button" href='/oauth/logout'>Log Out</a>
//                 </div>
//             </li>
//           ) : (<a href="/oauth/login"><button className="obutton login-button">LOG IN</button></a>) }
//         </div>}
//       </ul>
      
//     </nav>
//   )
// };

// export default withRouter(connect(store => store)(NavBar));
