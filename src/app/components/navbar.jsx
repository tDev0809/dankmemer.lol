import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import 'assets/styles/components/navbar.scss';
import Logo from 'assets/img/memer.webp';
import parseTime from '../util/parseTime.js';
import * as axios from 'axios';

const Navbar = ({ discount, login: { isAdmin, isModerator, loggedIn, username, discriminator, avatar, id }}) => {
	const [dropdown, setDropdown] = useState(false);
	const [dropdownEventListener, setDropdownEventListener] = useState(false);

	const [announcementHidden, setAnnouncementHidden] = useState(false);
	const [announcementContent, setAnnouncementContent] = useState("This is awkward. There is no announcement content.");
	const [recentAnnouncementNum, setRecentAnnouncementNum] = useState("0");

	const [mobile, setMobile] = useState(false);

	const [discountCountdown, setDiscountCountdown] = useState("");

	useEffect(() => {
		if(dropdown && mobile) {
			document.getElementById('pseudoBody').style.overflowY = 'hidden';
			document.getElementById('pseudoBody').style.height = '100vh';
			document.getElementsByTagName('footer')[0].style.display = 'none';
		} else if(!dropdown && mobile){
			document.getElementById('pseudoBody').style.overflowY = 'auto';
		}
	}, [dropdown, mobile]);


	useEffect(() => {
		handleResize();
		(async() => {
			try {
				let req = await axios('/api/announcement');
				if(req.data.announcement) {
					setAnnouncementContent(req.data.announcement.content);
					setRecentAnnouncementNum(req.data.announcement._id);
				}
			} catch {}
		})();

		const announcementStorage = localStorage.getItem("announcement-hidden");
		const announcementNum = localStorage.getItem("announcement-at");
		if(!announcementStorage && !announcementNum) return;
		if(announcementStorage === "hidden" && announcementNum === recentAnnouncementNum) setAnnouncementHidden(true);

		// Add an event listener to the window to check if the 
		// device is small enough for mobile navbar.
		window.addEventListener("resize", (e) => {
			handleResize();
		});
	}, []);

	useEffect(() => {
		if(!discount) return;
		let expiry = discount.expiry - 1000;
		setDiscountCountdown(new Date(expiry).toTimeString().split(' ')[0])
		setInterval(() => {
			expiry = expiry - 1000;
			setDiscountCountdown(new Date(expiry).toTimeString().split(' ')[0])
		}, 1000);
	}, [discount])

	useEffect(() => {
		if(announcementHidden) localStorage.setItem("announcement-hidden", "hidden")
		else localStorage.setItem("announcement-hidden", "no")
	}, [announcementHidden]);


	/**
	 * Account dropdown handler.
	 * 
	 * Adds an event listener to the DOM when it is open and removes it when it is closed.
	 * This allows for the dropdown to be closed by clicking the parent and clicking outside the parent
	 * or the dropdown.
	 */
	useEffect(() => {
		if(!mobile) {
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
		}
	}, [dropdown]);

	const handleResize = () => {
		let width = document.documentElement.clientWidth;
		if(width <= 730) {
			setMobile(true);
			setDropdown(false);
		} else if(width > 730) {
			setMobile(false);
			setDropdown(false);
		}
	}

	return (
		<div id="navigation-container">
			{announcementHidden ? '' :
				<div id="announcement">
					<div id="announcement-content">
						<p>{announcementContent}</p>
						{/* <p><span className="announcement-bold">Bot Update</span>: Changes to Slots, Blackjack and Bet commands. <a className="announcement-link" target="_blank" href="https://www.reddit.com/r/dankmemer/comments/m7b1fn/dank_memer_update/" rel="noopener noreferrer">Read more</a></p> */}
					</div>
					<div id="announcement-action" onClick={() => setAnnouncementHidden(!announcementHidden)}>
						<span className="material-icons">close</span>
					</div>
				</div>
			}
			{mobile ?
				<nav id="mobile">
					<div id="mobile-left">
						<Link to="/"><img src={Logo} alt="Logo" width="42" /></Link>
						<h2>Dank Memer</h2>
					</div>
					<div id="mobile-hamburger" onClick={() => setDropdown(!dropdown)}>
						<span className="material-icons">menu</span>
					</div>
					{dropdown ?
						<div id="mobile-content">
							<ul>
								<li className="mobile-nav-link"><NavLink to="/commands">Commands</NavLink></li>
								<li className="mobile-nav-link"><NavLink to="/faq">FAQ</NavLink></li>
								<li className="mobile-nav-link"><NavLink to="/blogs">Blog</NavLink></li>
								<li className={discount ? "mobile-nav-link discount" : "mobile-nav-link"}><NavLink to="/loot">Store</NavLink> {discount ? <span id="discount-countdown">SALE {discountCountdown}</span> : ''}</li>
								<li className="mobile-nav-link"><NavLink to="/appeals">Appeal a ban</NavLink></li>
								<li className="mobile-nav-link"><NavLink to="/reports">Report a user</NavLink></li>
								{isModerator || isAdmin ? 
								<li className="mobile-nav-link"><NavLink to="/control">Control panel</NavLink></li> 
								: ''}
								<li className="mobile-nav-link red"><a href="/oauth/logout" rel="noreferrer noopener">Logout</a></li>
							</ul>
						</div>
					: ''}
				</nav>
			:
				<nav id="desktop">
					<div id="desktop-left">
						<Link to="/"><img src={Logo} alt="Logo" width="42" /></Link>
						<ul id="desktop-left-links">
							<li className="desktop-nav-link"><NavLink to="/commands">Commands</NavLink></li>
							<li className="desktop-nav-link"><NavLink to="/faq">FAQ</NavLink></li>
							<li className="desktop-nav-link"><NavLink to="/blogs">Blog</NavLink></li>
							<li className={discount ? "desktop-nav-link discount" : "desktop-nav-link"}><NavLink to="/loot">Store</NavLink> {discount ? <span id="discount-countdown">SALE {discountCountdown}</span> : ''}</li>
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
									<li className="dropdown-item"><Link to="/appeals" className="dropdown-link">Appeal a ban</Link></li>
									<li className="dropdown-item"><Link to="/reports" className="dropdown-link">Report a user</Link></li>
									<li className="dropdown-item"><a href="/oauth/logout" rel="noreferrer noopener" className="dropdown-link red">Logout</a></li>
								</ul>
							</div> : ''}
						</div>}
					</div>
				</nav>
			}
		</div>
	);
};

export default withRouter(connect(store => store)(Navbar));
