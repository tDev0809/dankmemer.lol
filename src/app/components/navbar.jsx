import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import 'assets/styles/components/navbar.scss';
import Logo from 'assets/img/memer.webp';
import parseTime from '../util/parseTime.js';


const Navbar = ({ discount, login: { isAdmin, isModerator, loggedIn, username, discriminator, avatar, id }}) => {
	const [navExpanded, setNavExpanded] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [dropdownEventListener, setDropdownEventListener] = useState(false);

	// useEffect(() => {
	// 	if(navExpanded) {
	// 		document.getElementById('pseudoBody').style.overflowY = 'hidden';
	// 		document.getElementById('pseudoBody').style.height = '100vh';
	// 		document.getElementsByTagName('footer')[0].style.display = 'none';
	// 	} else if(!navExpanded){
	// 		document.getElementById('pseudoBody').style.overflowY = 'auto';
	// 	}
	// }, [navExpanded]);

	useEffect(() => {
		if(!dropdown && dropdownEventListener) {
			document.documentElement.removeEventListener('click', () => {
				return setHasEventListener(false);
			});
		} else if (dropdown && !dropdownEventListener) {
			document.documentElement.addEventListener('click', (e) => {
				setDropdownEventListener(true);
				if(
                    e.target !== document.getElementById('user-account') && 
                    e.target.parentNode !== document.getElementById("user-account-dropdown")
                ) return setDropdown(false);	
				
			});
		}
	}, [dropdown]);

	return (
		<div id="navigation-container">
			<div id="announcement">
				<div id="announcement-content">
					<p><span className="announcement-bold">Bot Update</span>: Changes to Slots, Blackjack and Bet commands. <a className="announcement-link" target="_blank" href="https://www.reddit.com/r/dankmemer/comments/m7b1fn/dank_memer_update/" rel="noopener noreferrer">Read more</a></p>
				</div>
			</div>
			<div id="navbar-mobile">
				<div id="navbar-mobile-head">
					<h2 id="navbar-mobile-head-text">Dank Memer</h2>
					<div id="navbar-mobile-head-hamburger" onClick={() => setNavExpanded(!navExpanded)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 20" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<line x1="4" y1="6" x2="20" y2="6" />
							<line x1="4" y1="12" x2="20" y2="12" />
							<line x1="4" y1="18" x2="20" y2="18" />
						</svg>
					</div>
				</div>
				<div id="navbar-mobile-container" className={navExpanded ? 'visible' : ''}>
					{loggedIn ? 
						<div id="navbar-mobile-account">
							<div id="navbar-mobile-account-picture" style={{ backgroundImage: `url('https://cdn.discordapp.com/avatars/${id}/${avatar}')` }}/>
							<div id="navbar-mobile-account-details">
								<p id="navbar-mobile-account-details-username">{username}</p>
								<p id="navbar-mobile-account-details-discriminator">#{discriminator}</p>
							</div>
						</div>
					: ''}
					<div id="navbar-mobile-links" className={loggedIn ? 'move-down' : ''}>
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
							className={discount ? "navbar-mobile-link discount" : "navbar-mobile-link"}
							activeClassName="active"
							to="/loot"
							onClick={() => {
								setTimeout(() => {
									setNavExpanded(!navExpanded);
								}, 1000)
							}}>Store</NavLink>
						{!loggedIn
							? <a className="navbar-mobile-link" href={"/oauth/login?redirect=" + window.location.pathname} rel="noreferrer noopener">Login with Discord</a>
							: <a className="navbar-mobile-link logout" href="/oauth/logout" rel="noreferrer noopener">Logout</a>
  						}
					</div>
				</div>
			</div>
			<nav id="desktop">
				<div id="desktop-left">
					<Link to="/"><img src={Logo} alt="Logo" width="42" /></Link>
					<ul id="desktop-left-links">
						<li className="desktop-nav-link"><NavLink to="/commands">Commands</NavLink></li>
						<li className="desktop-nav-link"><NavLink to="/faq">FAQ</NavLink></li>
						<li className="desktop-nav-link"><NavLink to="/blogs">Blog</NavLink></li>
						<li className="desktop-nav-link"><NavLink to="/loot">Store</NavLink></li>
					</ul>
				</div>
				<div id="desktop-right">
					<a href="https://discord.gg/meme" rel="noreferrer noopener" className="desktop-nav-link">Support</a>
					{!loggedIn ? 
					<a href={`/oauth/login?redirect=${window.location.pathname}`} rel="noreferrer noopener" className="desktop-nav-link highlight">Login</a> :
					<div id="user-account" onClick={() => setDropdown(!dropdown)}>
						<img id="user-account-avatar" src={`https://cdn.discordapp.com/avatars/${id}/${avatar}`} alt="?" width="32" />
						<p id="user-account-name"><span>{username}</span><span className="material-icons">expand_more</span></p>
						{dropdown ?
						<div id="user-account-dropdown">
							<ul id="user-account-dropdown-content">
								{isModerator || isAdmin ? <li className="dropdown-item"><Link to="/control" className="dropdown-link">Control panel</Link></li> : ''}
								<li className="dropdown-item"><Link to="/appeals" className="dropdown-link">Appeals</Link></li>
								<li className="dropdown-item"><Link to="/reports" className="dropdown-link">Reports</Link></li>
								<li className="dropdown-item"><a href="/oauth/logout" rel="noreferrer noopener" className="dropdown-link red">Logout</a></li>
							</ul>
						</div> : ''}
					</div>}
				</div>
			</nav>
			{/* <ul id="navbar-links">
				<li className="navbar-link"><NavLink activeClassName="active" exact to="/">Home</NavLink></li>
				<li className="navbar-link"><NavLink activeClassName="active" to="/commands">Commands</NavLink></li>
				<li className="navbar-link"><a href="https://discord.gg/meme">Support</a></li>
				<li className="navbar-link"><NavLink activeClassName="active" to="/blogs">Blog</NavLink></li>
				<li className="navbar-link"><NavLink activeClassName="active" to="/faq">FAQ</NavLink></li>
				<li className={discount ? "navbar-link discount" : "navbar-link" }><NavLink activeClassName="active" to="/loot">Store</NavLink></li>
				<li className="navbar-link">
					{!loggedIn
						? <a href={"/oauth/login?redirect=" + window.location.pathname} rel="noreferrer noopener">Login</a>
						: 	<div id="navbar-account" onClick={() => setNavDropdown(!navDropdown)}>
								<p id="navbar-account-name">Account
									<span id="navbar-account-chevron" className={navDropdown ? 'active' : ''}>
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
											<polyline points="6 9 12 15 18 9" />
										</svg>
									</span>
								</p>
								{navDropdown ? 
									<div id="navbar-account-dropdown" className={navDropdown ? 'active' : ''}>
										<div id="navbar-account-dropdown-account">
											<div id="navbar-account-dropdown-account-picture" style={{ backgroundImage: `url('https://cdn.discordapp.com/avatars/${id}/${avatar}')` }}/>
											<div id="navbar-account-dropdown-account-details">
												<p id="navbar-account-dropdown-account-details-username">{username}</p>
												<p id="navbar-account-dropdown-account-details-discriminator">#{discriminator}</p>
											</div>
										</div>
										<div id="navbar-account-dropdown-actions">
											{loggedIn && (isAdmin || isModerator) ? <Link className="navbar-account-dropdown-action" to="/control">Control panel</Link> : ''}
											<a id="navbar-account-dropdown-actions-logout" href="/oauth/logout">Logout</a>
										</div>
									</div>
								: ''}	
							</div>
					}
				</li>
			</ul> */}
		</div>
	);
};

export default withRouter(connect(store => store)(Navbar));
