import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink, Link } from 'react-router-dom';
import 'assets/styles/components/navbar.scss';
import Logo from 'assets/img/memer.png';
import parseTime from '../util/parseTime.js';
import Marquee from "react-fast-marquee";
import * as axios from 'axios';

const Navbar = ({ discount, login: { isAdmin, isModerator, loggedIn, username, avatar, id }}) => {
	const [dropdown, setDropdown] = useState(false);
	const [dropdownEventListener, setDropdownEventListener] = useState(false);

	const [announcementMarquee, setAnnouncementMarquee] = useState(false);
	const [announcementHidden, setAnnouncementHidden] = useState(true);
	const [announcementContent, setAnnouncementContent] = useState("This is awkward. There is no announcement content.");
	const [recentAnnouncementNum, setRecentAnnouncementNum] = useState("0");

	const [mobile, setMobile] = useState(false);

	const [discountCountdown, setDiscountCountdown] = useState("");

	useEffect(() => {
		if(dropdown && mobile) {
			document.documentElement.style.overflow = 'hidden';
		} else if(!dropdown && mobile){
			document.documentElement.style.overflow = 'auto';
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

					const announcementStorage = localStorage.getItem("announcement-hidden");
					const announcementNum = localStorage.getItem("announcement-at");
					if((!announcementStorage || announcementStorage === "no") || announcementNum !== req.data.announcement._id.toString()) setAnnouncementHidden(false);
					else if(announcementStorage === "hidden" && announcementNum === req.data.announcement._id.toString()) setAnnouncementContent(true);

					handleMarquee();
				}
			} catch {}
		})();

		// Add an event listener to the window to check if the 
		// device is small enough for mobile navbar.
		window.addEventListener("resize", (e) => {
			handleResize();
		});

		document.querySelectorAll("#announcement-content")[0] && document.querySelectorAll("#announcement-content > p")[0].addEventListener("resize", () => {
			handleMarquee();
		});
	}, []);

	useEffect(() => {
		if(!discount) return;
		let difference = discount.expiry - Date.now();
		let expiry = parseTime(discount.expiry - Date.now());
		setDiscountCountdown(`${expiry.hours.toString().length === 1 ? '0' + expiry.hours : expiry.hours}:${expiry.minutes.toString().length === 1 ? '0' + expiry.minutes : expiry.minutes}:${expiry.seconds.toString().length === 1 ? '0' + expiry.seconds : expiry.seconds}`)
		setInterval(() => {
			difference = difference - 1000
			expiry = parseTime(difference);
			setDiscountCountdown(`${expiry.hours.toString().length === 1 ? '0' + expiry.hours : expiry.hours}:${expiry.minutes.toString().length === 1 ? '0' + expiry.minutes : expiry.minutes}:${expiry.seconds.toString().length === 1 ? '0' + expiry.seconds : expiry.seconds}`)
		}, 1000);
	}, [discount])

	useEffect(() => {
		if(announcementHidden && recentAnnouncementNum !== "0") {
			localStorage.setItem("announcement-hidden", "hidden")
			localStorage.setItem("announcement-at", recentAnnouncementNum.toString())
		} else if (!announcementHidden && recentAnnouncementNum !== "0") {
			localStorage.setItem("announcement-hidden", "no");
		}
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
		handleMarquee();
		if(width <= 730) {
			setMobile(true);
			setDropdown(false);
		} else if(width > 730) {
			setMobile(false);
			setDropdown(false);
		}
	}

	const handleMarquee = () => {
		let announcementContent = document.getElementById("announcement-content");
		if(!announcementContent) return;
		if(announcementContent.offsetWidth < announcementContent.scrollWidth) setAnnouncementMarquee(true);
		else if(announcementContent.offsetWidth > announcementContent.scrollWidth) setAnnouncementMarquee(false);
	}

	return (
		<div id="navigation-container">
			{announcementHidden ? '' :
				<div id="announcement">
					<div id="announcement-content">
						{announcementMarquee ?
							<Marquee
								gradient={false}
								speed={50}
								pauseOnHover={true}
								style={{
									height: "unset"
								}}
							>
								<p dangerouslySetInnerHTML={{ __html: announcementContent }} style={{ marginRight: "60px" }}></p>
							</Marquee>
						: 
							<p dangerouslySetInnerHTML={{ __html: announcementContent }}></p>
						}
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
								<li className={discount ? "mobile-nav-link discount" : "mobile-nav-link"}><NavLink to="/loot">{discount ? <><p>Store</p> <span id="discount-countdown">SALE {discountCountdown}</span></>: 'Store'}</NavLink></li>
								<li className="mobile-nav-link"><NavLink to="/appeals">Appeal a ban</NavLink></li>
								<li className="mobile-nav-link"><NavLink to="/reports">Report a user</NavLink></li>
								{isModerator || isAdmin ? 
								<li className="mobile-nav-link"><NavLink to="/control">Control panel</NavLink></li> 
								: ''}
								{loggedIn ?
									<li className="mobile-nav-link red"><a href="/oauth/logout" rel="noreferrer noopener">Logout</a></li>
								:
									<li className="mobile-nav-link"><a href="/oauth/login?redirect=${window.location.pathname}" rel="noreferrer noopener">Login</a></li>
								}
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
